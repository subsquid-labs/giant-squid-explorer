import { lookupArchive } from '@subsquid/archive-registry';
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  BatchBlock
} from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/processor-tools';
import { getParsedEventsData } from './mappers/common';
import { blocksHandler } from './mappers/blocks';
import {
  BlockData,
  ChainDataName,
  ExtrinsicData,
  EventData
} from './utils/types';
import { Block as BlockEntity } from './model';
import { classExtrinsicsHandler } from './mappers/callsExtrinsics';
import { eventsHandler } from "./mappers/events";

const processor = new SubstrateBatchProcessor()
  .setDataSource({
    archive: lookupArchive('bifrost', { release: 'FireSquid' })
  })
  .addEvent('*', {
    data: {
      event: {
        // args: true,
        extrinsic: true,
        indexInBlock: true
      }
    }
  } as const)
  .addCall('*');

export type Item = BatchProcessorItem<typeof processor>;
export type Ctx = BatchContext<Store, Item>;
export type Block = BatchBlock<Item>;

processor.run(new TypeormDatabase(), async (ctx) => {
  const parsedData = getParsedEventsData(ctx);

  await ctx.store
    .deferredLoad(BlockEntity, [
      ...[...parsedData.get<BlockData>(ChainDataName.BLOCK).values()].map(
        (b) => b.id
      ),
      ...[
        ...parsedData.get<ExtrinsicData>(ChainDataName.EXTRINSIC).values()
      ].map((ex) => ex.blockId),
      ...[...parsedData.get<EventData>(ChainDataName.EVENT).values()].map(
        (e) => e.blockId
      )
    ])
    .load();

  await blocksHandler(ctx, parsedData.get<BlockData>(ChainDataName.BLOCK));

  await classExtrinsicsHandler(
    ctx,
    parsedData.get<ExtrinsicData>(ChainDataName.EXTRINSIC)
  );
  await eventsHandler(
    ctx,
    parsedData.get<EventData>(ChainDataName.EVENT)
  );
});
