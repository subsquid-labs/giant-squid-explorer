import { Ctx } from '../processor';
import { EventData } from '../utils/types';
import { Block, Call, Event, Extrinsic } from '../model';

export async function eventsHandler(
  ctx: Ctx,
  parsedData: Set<EventData> | undefined
) {
  if (!parsedData) return;

  for (const eventData of [...parsedData.values()]) {
    const { id, blockId, indexInBlock, extrinsicId, name } = eventData;

    let blockEntity = await ctx.store.get(Block, blockId, false);
    if (!blockEntity) continue;

    const newEvent = new Event({
      id,
      block: blockEntity,
      blockNumber: blockEntity.height,
      timestamp: blockEntity.timestamp,
      indexInBlock,
      name
    });

    const extrinsicEntity = extrinsicId
      ? await ctx.store.get(Extrinsic, extrinsicId, false)
      : null;

    if (extrinsicEntity) {
      newEvent.extrinsic = extrinsicEntity;
      newEvent.extrinsicHash = extrinsicEntity.extrinsicHash;
    }

    ctx.store.deferredUpsert(newEvent);
  }
}
