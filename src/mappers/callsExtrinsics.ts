import { Ctx } from '../processor';
import { ExtrinsicData } from '../utils/types';
import {
  Block,
  Call,
  Extrinsic,
} from '../model';

export async function classExtrinsicsHandler(
  ctx: Ctx,
  parsedData: Set<ExtrinsicData> | undefined
) {
  if (!parsedData) return;

  for (const extrinsicData of [...parsedData.values()]) {
    const {
      id,
      blockId,
      indexInBlock,
      extrinsicHash,
      version,
      signer,
      success,
      error,
      tip,
      fee,
      callData
    } = extrinsicData;

    let blockEntity = await ctx.store.get(Block, blockId, false);
    if (!blockEntity) continue;

    const newExtrinsic = new Extrinsic({
      id,
      block: blockEntity,
      blockNumber: blockEntity.height,
      timestamp: blockEntity.timestamp,
      extrinsicHash,
      indexInBlock,
      version,
      signer,
      error,
      success,
      tip,
      fee
    });

    // if (error) {
    //   newExtrinsic.error = new ExtrinsicError({
    //     kind: error.kind,
    //     value: error.value ? new ExtrinsicErrorValue(error.value) : null
    //   });
    // }

    const newCall = new Call({
      id: callData.id,
      name: callData.name,
      blockNumber: blockEntity.height,
      timestamp: blockEntity.timestamp,
      block: blockEntity,
      extrinsic: newExtrinsic,
      extrinsicHash,
      success
    });

    ctx.store.deferredUpsert(newExtrinsic);
    ctx.store.deferredUpsert(newCall);
  }
}
