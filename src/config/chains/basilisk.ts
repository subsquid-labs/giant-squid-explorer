import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'basilisk',
  prefix: 'basilisk',
  dataSource: {
    archive: 'https://basilisk.archive.subsquid.io/graphql',
    chain: 'wss://rpc.basilisk.cloud'
  }
}

export default config
