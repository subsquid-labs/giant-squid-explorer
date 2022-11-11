import { SubstrateBatchProcessor } from '@subsquid/substrate-processor';
import { lookupArchive } from '@subsquid/archive-registry';
import { TypeormDatabase } from '@subsquid/processor-tools';
import {
  Block as BlockEntity,
  Call,
  Event,
  Extrinsic,
  ProcessingThreadsStats
} from '../model';
import { SourceConfig, ThreadConfig } from '../config/processorConfig';

export function runProcessor(
  threadConfig: ThreadConfig,
  srcConfig: SourceConfig
) {
  const stateSchemaName = `processing_thread_${threadConfig.from}_${
    threadConfig.to ? threadConfig.to : 'inf'
  }`;
  const instance = new SubstrateBatchProcessor()
    .setDataSource({
      archive: lookupArchive(srcConfig.chainName, {
        release: 'FireSquid'
      })
    })
    .setPrometheusPort(threadConfig.prometheusPort)
    .setBlockRange({
      from: threadConfig.from,
      ...(threadConfig.to ? { to: threadConfig.to } : {})
    })
    .addEvent('*', {
      data: {
        event: {
          extrinsic: true,
          indexInBlock: true
        }
      }
    } as const)
    .addCall('*', {
      data: {
        call: {
          parent: true
        },
        extrinsic: true
      }
    })
    .includeAllBlocks();

  instance.run(
    new TypeormDatabase({
      stateSchema: stateSchemaName,
      isolationLevel: 'READ COMMITTED',
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
              // @ts-ignore
              const { id, name, indexInBlock, extrinsic } = item.event;

              const newEvent = new Event({
                id,
                block: currentBlock,
                blockNumber: currentBlock.height,
                timestamp: currentBlock.timestamp,
                indexInBlock: indexInBlock ?? null,
                name
              });

              if (extrinsic) {
                // @ts-ignore
                newEvent.extrinsic = { id: extrinsic.id };
                newEvent.extrinsicHash = extrinsic.hash;
              }

              ctx.store.deferredUpsert(newEvent);
              break;
            }
            case 'call': {
              // @ts-ignore
              const { extrinsic }: { extrinsic: ExtrinsicScalars } = item;

              let signer: string | null = null;

              if (
                extrinsic.signature &&
                extrinsic.signature.address &&
                extrinsic.signature.address.__kind &&
                extrinsic.signature.address.__kind === 'Id'
              ) {
                signer = extrinsic.signature.address.value;
              }

              const newExtrinsic = new Extrinsic({
                // @ts-ignore
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
                name: item.call.name,
                // @ts-ignore
                parentId: item.call.parent ? item.call.parent.id : null,
                blockNumber: currentBlock.height,
                timestamp: currentBlock.timestamp,
                block: currentBlock,
                extrinsic: newExtrinsic,
                extrinsicHash: newExtrinsic.extrinsicHash,
                success: extrinsic.success
              });

              ctx.store.deferredUpsert(newExtrinsic);
              ctx.store.deferredUpsert(newCall);

              break;
            }
            default:
          }
        }
      }

      const lastBlockHeightInBatch =
        ctx.blocks[ctx.blocks.length - 1].header.height;

      const threadsStats = new ProcessingThreadsStats({
        id: threadConfig.index.toString(),
        from: threadConfig.from,
        to: threadConfig.to ?? null,
        threadLastBlock: lastBlockHeightInBatch,
        threadProgress: threadConfig.to
          ? getRangeStatus(
              threadConfig.from,
              threadConfig.to,
              lastBlockHeightInBatch
            )
          : 0,
        threadProcessedBlocksCount: lastBlockHeightInBatch - threadConfig.from
      });
      ctx.store.deferredUpsert(threadsStats);

      const saveThreshold =
        process.env.SAVE_THRESHOLD ?? srcConfig.batchSizeSaveThreshold;
      if (
        ctx.blocks.length === 1 ||
        (threadConfig.to && lastBlockHeightInBatch === threadConfig.to) ||
        [...ctx.store.values(BlockEntity)].length > saveThreshold
      ) {
        ctx.log.info(
          `------------ ${stateSchemaName} :: batch size ${
            ctx.blocks.length
          } :: Saved: ${[...ctx.store.values(BlockEntity)].length} Blocks | ${
            [...ctx.store.values(Extrinsic)].length
          } extrinsics | ${[...ctx.store.values(Call)].length} calls | ${
            [...ctx.store.values(Event)].length
          } events ------------ `
        );

        await ctx.store.flush();
        ctx.store.purge();
        await ctx.store.UNSAFE_commitTransaction();
      }
    }
  );

  return instance;
}

function getRangeStatus(from: number, to: number, current: number): number {
  return Math.round(((current - from) * 100) / (to - from));
}
