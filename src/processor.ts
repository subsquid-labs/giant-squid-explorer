import { BLACKLIST_CONFIG, getChainConfig } from './config'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { Block as BlockEntity, Call, Event, Extrinsic } from './model'
import {
  BatchProcessorCallItem,
  SubstrateBatchProcessor
} from '@subsquid/substrate-processor'
import { encodeAccount, getParsedArgs, ItemsLogger } from './utils/common'

const CHAIN_CONFIG = getChainConfig()

const processor = new SubstrateBatchProcessor()
  //.setBlockRange(CHAIN_CONFIG.blockRange ?? { from: 1_000_000 })
  .setDataSource(CHAIN_CONFIG.dataSource)
  .addEvent('*', {
    data: {
      event: {
        extrinsic: true,
        indexInBlock: true,
        args: true
      }
    }
  } as const)
  .addCall('*', {
    data: {
      call: {
        parent: true,
        args: true
      },
      extrinsic: true
    }
  } as const)
  .includeAllBlocks()

if (CHAIN_CONFIG.typesBundle != null)
  processor.setTypesBundle(CHAIN_CONFIG.typesBundle)

type CallItem = BatchProcessorCallItem<typeof processor>

processor.run(new TypeormDatabase(), async (ctx) => {
  const entitiesStore = new Map<
    'block' | 'event' | 'call' | 'extrinsic',
    Map<string, BlockEntity | Event | Call | Extrinsic>
  >()
  entitiesStore.set('block', new Map())
  entitiesStore.set('event', new Map())
  entitiesStore.set('call', new Map())
  entitiesStore.set('extrinsic', new Map())

  if (!ItemsLogger.isInitialized())
    await ItemsLogger.init({ block: ctx.blocks[0] as any, ...ctx })
  for (let block of ctx.blocks) {
    const currentBlock = new BlockEntity({
      id: block.header.id,
      height: block.header.height,
      hash: block.header.hash,
      parentHash: block.header.parentHash,
      timestamp: new Date(block.header.timestamp),
      specVersion: Number(block.header.specId.split('@')[1]),
      validator: block.header.validator,
      extrinsicsCount: 0,
      callsCount: 0,
      eventsCount: 0
    })
    entitiesStore.get('block')!.set(currentBlock.id, currentBlock)

    for (let item of block.items) {
      switch (item.kind) {
        case 'event': {
          currentBlock.eventsCount += 1
          const { id, name, indexInBlock, extrinsic, args } = item.event

          const decoratedName = name.split('.')

          const newEvent = new Event({
            id,
            block: currentBlock,
            blockNumber: currentBlock.height,
            timestamp: currentBlock.timestamp,
            indexInBlock: indexInBlock ?? null,
            palletName: decoratedName[0],
            eventName: decoratedName[1]
          })

          ItemsLogger.addEvent({
            itemName: newEvent.eventName,
            palletName: newEvent.palletName
          })

          if (!BLACKLIST_CONFIG.blacklistItems.includes(name))
            try {
              newEvent.argsStr = getParsedArgs(args)
            } catch (e) {
              ctx.log.warn('Event args cannot be stringified.')
              console.dir(e, { depth: null })
            }

          if (extrinsic) {
            // @ts-ignore
            newEvent.extrinsic = { id: extrinsic.id }
            newEvent.extrinsicHash = extrinsic.hash
            // @ts-ignore
            newEvent.call = { id: extrinsic.call.id }
          }
          entitiesStore.get('event')!.set(newEvent.id, newEvent)
          break
        }
        case 'call': {
          currentBlock.callsCount += 1
          const { extrinsic }: CallItem = item
          const decoratedCallName = item.call.name.split('.')
          const rawAddress =
            extrinsic.signature?.address?.value || extrinsic?.signature?.address

          // Removed address encoding

          // let signer: string | null = null
          // let encodedSignerAccount: string | null = null
          // if (rawAddress) {
          //   signer = rawAddress
          //   encodedSignerAccount = encodeAccount(signer, CHAIN_CONFIG.prefix)
          // }
          const newExtrinsic = new Extrinsic({
            id: item.extrinsic.id,
            block: currentBlock,
            blockNumber: currentBlock.height,
            timestamp: currentBlock.timestamp,
            extrinsicHash: extrinsic.hash,
            indexInBlock: extrinsic.indexInBlock,
            version: extrinsic.version,
            signerPublicKey: rawAddress,
            error: extrinsic.error ? JSON.stringify(extrinsic.error) : null,
            success: extrinsic.success,
            tip: extrinsic.tip,
            fee: extrinsic.fee
          })

          const newCall = new Call({
            id: item.call.id,
            palletName: decoratedCallName[0],
            callName: decoratedCallName[1],
            parentId: item.call.parent?.id ?? null,
            blockNumber: currentBlock.height,
            timestamp: currentBlock.timestamp,
            block: currentBlock,
            extrinsic: newExtrinsic,
            extrinsicHash: newExtrinsic.extrinsicHash,
            success: extrinsic.success,
            callerPublicKey: rawAddress
          })

          // If this is main call of the extrinsic
          if (newCall.parentId == null) {
            currentBlock.extrinsicsCount += 1
            newExtrinsic.mainCall = newCall
          }

          ItemsLogger.addCall(
            { itemName: newCall.callName, palletName: newCall.palletName },
            !newCall.parentId
          )

          if (!BLACKLIST_CONFIG.blacklistItems.includes(item.call.name)) {
            try {
              newCall.argsStr = getParsedArgs(item.call.args)
            } catch (e) {
              ctx.log.warn(
                `Event args cannot be stringified in call ${item.call.id}.`
              )
              console.dir(e, { depth: null })
            }
          }

          entitiesStore.get('call')!.set(newCall.id, newCall)
          entitiesStore.get('extrinsic')!.set(newExtrinsic.id, newExtrinsic)

          break
        }
        default:
      }
    }
  }
  await ItemsLogger.saveToDB({ block: ctx.blocks[0] as any, ...ctx })
  const blocks = entitiesStore.get('block')
  if (blocks && blocks.size > 0) await ctx.store.insert([...blocks.values()])

  // Save only ids first because of cyclic dependency extrinsic<-->call
  const extrinsics = entitiesStore.get('extrinsic')
  if (extrinsics && extrinsics.size > 0) {
    const extrinsicsIds = [...extrinsics.keys()].map(
      (id) => new Extrinsic({ id })
    )
    await ctx.store.insert(extrinsicsIds)
  }

  const calls = entitiesStore.get('call')
  if (calls && calls.size > 0) await ctx.store.insert([...calls.values()])

  // Save full info of extrinsics
  if (extrinsics && extrinsics.size > 0) {
    await ctx.store.save([...extrinsics.values()])
  }

  const events = entitiesStore.get('event')
  if (events && events.size > 0) await ctx.store.insert([...events.values()])
})
