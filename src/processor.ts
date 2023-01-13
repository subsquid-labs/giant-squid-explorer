import { blacklist ,getChainConfig } from './config';
import { lookupArchive } from '@subsquid/archive-registry';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { Block as BlockEntity, Call, Event, Extrinsic } from './model';
import {
  BatchProcessorCallItem,
  SubstrateBatchProcessor
} from '@subsquid/substrate-processor';
import { encodeAccount, getParsedArgs, ItemsLogger } from './utils/common';

const LIMIT = Number(process.env.LIMIT) ?? 100;


const chainConfig = getChainConfig();

const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: Number(process.env.START) ?? 10_000_000 })
  .setDataSource({
    archive: lookupArchive(chainConfig.srcConfig.chainName, {
      release: 'FireSquid'
    })
  })
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
  .includeAllBlocks();

type CallItem = BatchProcessorCallItem<typeof processor>;

processor.run(new TypeormDatabase(), async (ctx) => {
  const entitiesStore = new Map<
    'block' | 'event' | 'call' | 'extrinsic',
    Map<string, BlockEntity | Event | Call | Extrinsic>
  >();
  entitiesStore.set('block', new Map());
  entitiesStore.set('event', new Map());
  entitiesStore.set('call', new Map());
  entitiesStore.set('extrinsic', new Map());

  for (let block of ctx.blocks) {
    const currentBlock = new BlockEntity({
      id: block.header.id,
      height: block.header.height,
      hash: block.header.hash,
      parentHash: block.header.parentHash,
      timestamp: new Date(block.header.timestamp)
    });

    entitiesStore.get('block')!.set(currentBlock.id, currentBlock);

    for (let item of block.items) {
      switch (item.kind) {
        case 'event': {
          const { id, name, indexInBlock, extrinsic, args } = item.event;

          const decoratedName = name.split('.');

          const newEvent = new Event({
            id,
            block: currentBlock,
            blockNumber: currentBlock.height,
            timestamp: currentBlock.timestamp,
            indexInBlock: indexInBlock ?? null,
            palletName: decoratedName[0],
            eventName: decoratedName[1]
          });
          if (
            // @ts-ignore
            !BLACKLIST.includes(name)
          )
            try {
              newEvent.argsStr = getParsedArgs(args);
              // TESTING
              const argLen = newEvent.argsStr.length;
              ItemsLogger.add(name, argLen);
            } catch (e) {
              ctx.log.warn('Event args cannot be stringified.');
              console.dir(e, { depth: null });
            }

          if (extrinsic) {
            // @ts-ignore
            newEvent.extrinsic = { id: extrinsic.id };
            newEvent.extrinsicHash = extrinsic.hash;
            // @ts-ignore
            newEvent.call = { id: extrinsic.call.id };
          }
          entitiesStore.get('event')!.set(newEvent.id, newEvent);
          break;
        }
        case 'call': {
          const { extrinsic }: CallItem = item;
          let signer: string | null = null;
          let encodedSignerAccount: string | null = null;
          const decoratedCallName = item.call.name.split('.');

          if (
            extrinsic.signature &&
            extrinsic.signature.address &&
            extrinsic.signature.address.__kind &&
            extrinsic.signature.address.__kind === 'Id'
          ) {
            signer = extrinsic.signature.address.value;
            encodedSignerAccount = encodeAccount(
              signer,
              chainConfig.srcConfig.prefix
            );
          }

          const newExtrinsic = new Extrinsic({
            id: item.extrinsic.id,
            block: currentBlock,
            blockNumber: currentBlock.height,
            timestamp: currentBlock.timestamp,
            extrinsicHash: extrinsic.hash,
            indexInBlock: extrinsic.indexInBlock,
            version: extrinsic.version,
            signerPublicKey: signer,
            signerAccount: encodedSignerAccount,
            error: extrinsic.error ? JSON.stringify(extrinsic.error) : null,
            success: extrinsic.success,
            tip: extrinsic.tip,
            fee: extrinsic.fee
          });

          const newCall = new Call({
            id: item.call.id,
            palletName: decoratedCallName[0],
            callName: decoratedCallName[1],
            parentId: item.call.parent ? item.call.parent.id : null,
            blockNumber: currentBlock.height,
            timestamp: currentBlock.timestamp,
            block: currentBlock,
            extrinsic: newExtrinsic,
            extrinsicHash: newExtrinsic.extrinsicHash,
            success: extrinsic.success,
            callerPublicKey: signer,
            callerAccount: encodedSignerAccount
          });

          if (
            // @ts-ignore
            !BLACKLIST.includes(item.call.name)
          ) {
            try {
              newCall.argsStr = getParsedArgs(item.call.args);
              // TESTING
              const argLen = newCall.argsStr.length;
              ItemsLogger.add(item.call.name, argLen);
            } catch (e) {
              ctx.log.warn(
                `Event args cannot be stringified in call ${item.call.id}.`
              );
              console.dir(e, { depth: null });
            }
          }

          entitiesStore.get('call')!.set(newCall.id, newCall);
          entitiesStore.get('extrinsic')!.set(newExtrinsic.id, newExtrinsic);

          break;
        }
        default:
      }
    }
  }

  ItemsLogger.printStats();
  // if (entitiesStore.get('block')!.size > 0)
  //   await ctx.store.insert([...entitiesStore.get('block')!.values()]);

  // if (entitiesStore.get('extrinsic')!.size > 0)
  //   await ctx.store.insert([...entitiesStore.get('extrinsic')!.values()]);

  // if (entitiesStore.get('call')!.size > 0)
  //   await ctx.store.insert([...entitiesStore.get('call')!.values()]);

  // if (entitiesStore.get('event')!.size > 0)
  //   await ctx.store.insert([...entitiesStore.get('event')!.values()]);
});
