import { SubstrateProcessor } from '@subsquid/substrate-processor'

export interface ProcessorConfig {
  chainName: string
  prefix?: number | string
  dataSource: Parameters<SubstrateProcessor<any>['setDataSource']>[0]
  blockRange?: Parameters<SubstrateProcessor<any>['setBlockRange']>[0]
}
