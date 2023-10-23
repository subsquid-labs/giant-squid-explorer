import {SubstrateBatchProcessor} from '@subsquid/substrate-processor'

export interface ProcessorConfig {
    chainName: string
    prefix?: number | string
    dataSource: Parameters<SubstrateBatchProcessor<any>['setDataSource']>[0]
    blockRange?: Parameters<SubstrateBatchProcessor<any>['setBlockRange']>[0]
}
