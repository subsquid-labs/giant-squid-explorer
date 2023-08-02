import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'clover',
  prefix: 'clover',
  dataSource: {
    archive: 'https://clover.archive.subsquid.io/graphql',
    chain: 'wss://rpc-para.clover.finance'
  }
}

export default config
