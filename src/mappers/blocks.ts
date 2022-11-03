import { Ctx } from '../processor';
import { BlockData } from '../utils/types';
import { Block } from '../model';

export async function blocksHandler(
  ctx: Ctx,
  parsedData: Set<BlockData> | undefined
) {
  if (!parsedData) return;

  for (const { id, height, hash, parentHash, timestamp } of [
    ...parsedData.values()
  ]) {
    let blockEntity = await ctx.store.get(Block, id, false);
    if (blockEntity) continue;

    blockEntity = new Block({
      id,
      height,
      hash,
      parentHash,
      timestamp
    });

    ctx.store.deferredUpsert(blockEntity);
  }
}
