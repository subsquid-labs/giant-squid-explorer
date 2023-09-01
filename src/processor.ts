import {
    Block as Block_,
    BlockHeader as BlockHeader_,
    Call as Call_,
    DataHandlerContext,
    Event as Event_,
    Extrinsic as Extrinsic_,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
} from '@subsquid/substrate-processor'
import {getChainConfig} from './config'

const CHAIN_CONFIG = getChainConfig()

export const processor = new SubstrateBatchProcessor()
    //.setBlockRange(CHAIN_CONFIG.blockRange ?? { from: 1_000_000 })
    .setDataSource(CHAIN_CONFIG.dataSource)
    .setFields({
        block: {
            timestamp: true,
            digest: true,
            extrinsicsRoot: true,
            stateRoot: true,
            validator: true,
        },
        call: {
            name: true,
            args: true,
            origin: true,
            success: true,
            error: true,
        },
        event: {
            name: true,
            args: true,
            phase: true,
        },
        extrinsic: {
            hash: true,
            success: true,
            error: true,
            fee: true,
            signature: true,
            tip: true,
            version: true,
        },
    })
    .addCall({
        extrinsic: true,
        stack: true,
    })
    .addEvent({
        call: true,
        extrinsic: true,
    })
    .includeAllBlocks()

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Call = Call_<Fields>
export type Event = Event_<Fields>
export type Extrinsic = Extrinsic_<Fields>
export type Block = Block_<Fields>
export type BlockHeader = BlockHeader_<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
