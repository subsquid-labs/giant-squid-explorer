import { getConfig } from './config';
import { lookupArchive } from '@subsquid/archive-registry';
import { TypeormDatabase } from '@subsquid/processor-tools';
import { Block as BlockEntity, Call, Event, Extrinsic } from './model';
import {
  BatchContext,
  BatchProcessorCallItem,
  BatchProcessorEventItem,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  SubstrateBlock,
} from '@subsquid/substrate-processor'

const chainConfig = getConfig();

const processor = new SubstrateBatchProcessor()
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

type CallItem = BatchProcessorCallItem<typeof processor>

processor.run(
  new TypeormDatabase({
    disableAutoFlush: true,
    disableAutoTxCommit: true,
    disableAutoHeightUpdate: true
  }),
  async (ctx) => {
    for (let block of ctx.blocks) {
      const currentBlock = new BlockEntity({
        id: block.header.id,
        height: block.header.height,
        hash: block.header.hash,
        parentHash: block.header.parentHash,
        timestamp: new Date(block.header.timestamp)
      });

      ctx.store.deferredUpsert(currentBlock);

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

            try {
              newEvent.argsStr = JSON.stringify(args);
            } catch (e) {
              ctx.log.warn('Event args cannot be stringified.');
            }

            if (extrinsic) {
              // @ts-ignore
              newEvent.extrinsic = { id: extrinsic.id };
              newEvent.extrinsicHash = extrinsic.hash;
              // @ts-ignore
              newEvent.call = { id: extrinsic.call.id };
            }

            ctx.store.deferredUpsert(newEvent);
            break;
          }
          case 'call': {
            const { extrinsic }: CallItem = item;

            let signer: string | null = null;
            const decoratedCallName = item.call.name.split('.');

            if (
              extrinsic.signature &&
              extrinsic.signature.address &&
              extrinsic.signature.address.__kind &&
              extrinsic.signature.address.__kind === 'Id'
            ) {
              signer = extrinsic.signature.address.value;
            }

            const newExtrinsic = new Extrinsic({
              id: item.extrinsic.id,
              block: currentBlock,
              blockNumber: currentBlock.height,
              timestamp: currentBlock.timestamp,
              extrinsicHash: extrinsic.hash,
              indexInBlock: extrinsic.indexInBlock,
              version: extrinsic.version,
              signer,
              error: extrinsic.error ? JSON.stringify(extrinsic.error) : null,
              success: extrinsic.success,
              tip: extrinsic.tip,
              fee: extrinsic.fee
            });

            const newCall = new Call({
              id: item.call.id,
              palletName: decoratedCallName[0],
              eventName: decoratedCallName[1],
              parentId: item.call.parent ? item.call.parent.id : null,
              blockNumber: currentBlock.height,
              timestamp: currentBlock.timestamp,
              block: currentBlock,
              extrinsic: newExtrinsic,
              extrinsicHash: newExtrinsic.extrinsicHash,
              success: extrinsic.success,
              caller: signer
            });

            try {
              newCall.argsStr = JSON.stringify(item.call.args);
            } catch (e) {
              ctx.log.warn('Event args cannot be stringified.');
            }

            ctx.store.deferredUpsert(newExtrinsic);
            ctx.store.deferredUpsert(newCall);

            break;
          }
          default:
        }
      }
    }

    const saveThreshold =
      process.env.SAVE_THRESHOLD ??
      chainConfig.srcConfig.batchSizeSaveThreshold;
    if (
      ctx.blocks.length === 1 ||
      [...ctx.store.values(BlockEntity)].length > saveThreshold
    ) {
      ctx.log.info(
        `------------ batch size ${ctx.blocks.length} :: Saved: ${
          [...ctx.store.values(BlockEntity)].length
        } Blocks | ${[...ctx.store.values(Extrinsic)].length} extrinsics | ${
          [...ctx.store.values(Call)].length
        } calls | ${[...ctx.store.values(Event)].length} events ------------ `
      );

      await ctx.store.flush();
      ctx.store.purge();
      await ctx.store.UNSAFE_commitTransaction();
    }
  }
);
