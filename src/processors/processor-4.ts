import { lookupArchive } from '@subsquid/archive-registry';
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  BatchBlock
} from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/processor-tools';
import { Block as BlockEntity, Call, Event, Extrinsic } from '../model';

import { SubstrateExtrinsic } from '@subsquid/substrate-processor/src/interfaces/substrate';
type ExtrinsicScalars = Omit<SubstrateExtrinsic, 'call'>;

// export type Item = BatchProcessorItem<typeof processor>;
// export type Ctx = BatchContext<Store, Item>;
// export type Block = BatchBlock<Item>;

// 2_861_981
const parallelBatchesConfig = [[1800001, 240000, 3004]];
// const parallelBatchesConfig = [[0, 10000, 3000]];
const processorItemsList: {
  procItemConf: number[];
  instance: SubstrateBatchProcessor;
}[] = [];

for (const procItemConf of parallelBatchesConfig) {
  const instance = new SubstrateBatchProcessor()
    .setDataSource({
      archive: lookupArchive('bifrost', { release: 'FireSquid' })
    })
    .setPrometheusPort(procItemConf[2] as number)
    .setBlockRange({
      from: procItemConf[0],
      ...(procItemConf[1] ? { to: procItemConf[1] } : {})
    })
    .addEvent('*', {
      // range: {
      //   from: procItemConf[0],
      //   ...(procItemConf[1] ? { to: procItemConf[1] } : {})
      // },
      data: {
        event: {
          // args: true,
          extrinsic: true,
          indexInBlock: true
        }
      }
    } as const)
    .addCall('*', {
      // range: {
      //   from: procItemConf[0],
      //   ...(procItemConf[1] ? { to: procItemConf[1] } : {})
      // },
      data: {
        call: {
          parent: true
        },
        extrinsic: true
      }
    })
    .includeAllBlocks();
  console.log(
    'schema - ',
    `processing_thread_${procItemConf[0]}_${
      procItemConf[1] ? procItemConf[1] : 'inf'
    }`
  );
  instance.run(
    new TypeormDatabase({
      stateSchema: `processing_thread_${procItemConf[0]}_${
        procItemConf[1] ? procItemConf[1] : 'inf'
      }`,
      disableAutoFlush: true
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

      if (ctx.blocks.length === 1) {
        ctx.log
          // .child(
          //   `proc__${procItemConf[0]}-${
          //     procItemConf[1] ? procItemConf[1] : 'inf'
          //   }`
          // )
          .info(
            `------------ Saved: ${
              [...ctx.store.values(BlockEntity)].length
            } Blocks | ${
              [...ctx.store.values(Extrinsic)].length
            } extrinsics | ${[...ctx.store.values(Call)].length} calls | ${
              [...ctx.store.values(Event)].length
            } events ------------ `
          );
        await ctx.store.flush();
        ctx.store.purge();
      } else if ([...ctx.store.values(BlockEntity)].length > 5000) {
        ctx.log
          // .child(
          //   `proc__${procItemConf[0]}-${
          //     procItemConf[1] ? procItemConf[1] : 'inf'
          //   }`
          // )
          .info(
            `------------ Saved: ${
              [...ctx.store.values(BlockEntity)].length
            } Blocks | ${
              [...ctx.store.values(Extrinsic)].length
            } extrinsics | ${[...ctx.store.values(Call)].length} calls | ${
              [...ctx.store.values(Event)].length
            } events ------------ `
          );
        await ctx.store.flush();
        ctx.store.purge();
      }
    }
  );

  processorItemsList.push({
    procItemConf,
    // @ts-ignore
    instance
  });
}

// for (const itemData of processorItemsList) {
//   itemData.instance.run(
//     new TypeormDatabase({
//       stateSchema: `processing_thread_${itemData.procItemConf[0]}_${
//         itemData.procItemConf[1] ? itemData.procItemConf[1] : 'inf'
//       }`,
//       disableAutoFlush: true
//     }),
//     async (ctx) => {
//       for (let block of ctx.blocks) {
//         const currentBlock = new BlockEntity({
//           id: block.header.id,
//           height: block.header.height,
//           hash: block.header.hash,
//           parentHash: block.header.parentHash,
//           timestamp: new Date(block.header.timestamp)
//         });
//
//         ctx.store.deferredUpsert(currentBlock);
//
//         for (let item of block.items) {
//           switch (item.kind) {
//             case 'event': {
//               // @ts-ignore
//               const { id, name, indexInBlock, extrinsic } = item.event;
//
//               const newEvent = new Event({
//                 id,
//                 block: currentBlock,
//                 blockNumber: currentBlock.height,
//                 timestamp: currentBlock.timestamp,
//                 indexInBlock: indexInBlock ?? null,
//                 name
//               });
//
//               if (extrinsic) {
//                 // @ts-ignore
//                 newEvent.extrinsic = { id: extrinsic.id };
//                 newEvent.extrinsicHash = extrinsic.hash;
//               }
//
//               ctx.store.deferredUpsert(newEvent);
//               break;
//             }
//             case 'call': {
//               // @ts-ignore
//               const { extrinsic }: { extrinsic: ExtrinsicScalars } = item;
//
//               let signer: string | null = null;
//
//               if (
//                 extrinsic.signature &&
//                 extrinsic.signature.address &&
//                 extrinsic.signature.address.__kind &&
//                 extrinsic.signature.address.__kind === 'Id'
//               ) {
//                 signer = extrinsic.signature.address.value;
//               }
//
//               const newExtrinsic = new Extrinsic({
//                 // @ts-ignore
//                 id: item.extrinsic.id,
//                 block: currentBlock,
//                 blockNumber: currentBlock.height,
//                 timestamp: currentBlock.timestamp,
//                 extrinsicHash: extrinsic.hash,
//                 indexInBlock: extrinsic.indexInBlock,
//                 version: extrinsic.version,
//                 signer,
//                 error: extrinsic.error ? JSON.stringify(extrinsic.error) : null,
//                 success: extrinsic.success,
//                 tip: extrinsic.tip,
//                 fee: extrinsic.fee
//               });
//
//               const newCall = new Call({
//                 id: item.call.id,
//                 name: item.call.name,
//                 // @ts-ignore
//                 parentId: item.call.parent ? item.call.parent.id : null,
//                 blockNumber: currentBlock.height,
//                 timestamp: currentBlock.timestamp,
//                 block: currentBlock,
//                 extrinsic: newExtrinsic,
//                 extrinsicHash: newExtrinsic.extrinsicHash,
//                 success: extrinsic.success
//               });
//
//               ctx.store.deferredUpsert(newExtrinsic);
//               ctx.store.deferredUpsert(newCall);
//
//               break;
//             }
//             default:
//           }
//         }
//       }
//
//       if (ctx.blocks.length === 1) {
//         ctx.log
//           // .child(
//           //   `proc__${itemData.procItemConf[0]}-${
//           //     itemData.procItemConf[1] ? itemData.procItemConf[1] : 'inf'
//           //   }`
//           // )
//           .info(
//             `------------ Saved: ${
//               [...ctx.store.values(BlockEntity)].length
//             } Blocks | ${
//               [...ctx.store.values(Extrinsic)].length
//             } extrinsics | ${[...ctx.store.values(Call)].length} calls | ${
//               [...ctx.store.values(Event)].length
//             } events ------------ `
//           );
//         await ctx.store.flush();
//         ctx.store.purge();
//       } else if ([...ctx.store.values(BlockEntity)].length > 5000) {
//         ctx.log
//           // .child(
//           //   `proc__${itemData.procItemConf[0]}-${
//           //     itemData.procItemConf[1] ? itemData.procItemConf[1] : 'inf'
//           //   }`
//           // )
//           .info(
//             `------------ Saved: ${
//               [...ctx.store.values(BlockEntity)].length
//             } Blocks | ${
//               [...ctx.store.values(Extrinsic)].length
//             } extrinsics | ${[...ctx.store.values(Call)].length} calls | ${
//               [...ctx.store.values(Event)].length
//             } events ------------ `
//           );
//         await ctx.store.flush();
//         ctx.store.purge();
//       }
//     }
//   );
// }

// const processor = new SubstrateBatchProcessor()
//   .setDataSource({
//     archive: lookupArchive('bifrost', { release: 'FireSquid' })
//   })
//   // .setBatchSize(500)
//   // .setBlockRange({ from: 14876953 })
//   .addEvent('*', {
//     data: {
//       event: {
//         // args: true,
//         extrinsic: true,
//         indexInBlock: true
//       }
//     }
//   } as const)
//   .addCall('*', {
//     data: {
//       call: {
//         parent: true
//       },
//       extrinsic: true
//     }
//   });
