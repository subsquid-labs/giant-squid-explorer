import { Ctx } from '../processor';
import {
  BlockData,
  ChainDataName,
  EventData,
  ExtrinsicData,
  ExtrinsicError
} from '../utils/types';

import { ParsedChainDataScope } from '../utils/common';
import { SubstrateExtrinsic } from '@subsquid/substrate-processor/src/interfaces/substrate';
type ExtrinsicScalars = Omit<SubstrateExtrinsic, 'call'>;

export function getParsedEventsData(ctx: Ctx): ParsedChainDataScope {
  const parsedData = new ParsedChainDataScope();

  for (let block of ctx.blocks) {
    const blockData: BlockData = {
      id: block.header.id,
      height: block.header.height,
      hash: block.header.hash,
      parentHash: block.header.parentHash,
      timestamp: new Date(block.header.timestamp)
    };
    parsedData.set(ChainDataName.BLOCK, blockData);

    for (let item of block.items) {
      switch (item.kind) {
        case 'event': {
          const { id, name, indexInBlock, extrinsic } = item.event;
          let data: EventData = {
            extrinsicId: extrinsic ? extrinsic.id : null,
            indexInBlock: indexInBlock ?? null,
            blockId: blockData.id,
            id,
            name
          };
          parsedData.set(ChainDataName.EVENT, data);
          break;
        }
        case 'call': {
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

          let data: ExtrinsicData = {
            id: item.extrinsic.id,
            blockId: blockData.id,
            extrinsicHash: extrinsic.hash,
            indexInBlock: extrinsic.indexInBlock,
            version: extrinsic.version,
            success: extrinsic.success,
            error: null,
            tip: extrinsic.tip ?? null,
            fee: extrinsic.fee ?? null,
            callData: {
              id: item.call.id,
              name: item.call.name
            },
            signer
          };

          if (extrinsic.error) {
            data.error = JSON.stringify(extrinsic.error);

            // data.error = {} as ExtrinsicError;
            // data.error.kind = extrinsic.error.kind;
            // data.error.value = extrinsic.error.value
            //   ? {
            //     error: extrinsic.error.value.error ?? null,
            //     index: extrinsic.error.value.index ?? null
            //   }
            //   : null;
          }
          parsedData.set(ChainDataName.EXTRINSIC, data);
          break;
        }
        default:
      }
    }
  }
  return parsedData;
}
