import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'kylin',
  prefix: 'kylin',
  dataSource: {
    archive: 'https://kylin.archive.subsquid.io/graphql',
    chain: 'wss://polkadot.kylin-node.co.uk'
  }
}

export default config
