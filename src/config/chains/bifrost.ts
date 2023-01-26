import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'bifrost',
  prefix: 'bifrost',
  dataSource: {
    archive: 'https://bifrost.archive.subsquid.io/graphql',
    chain: 'wss://eu.bifrost-rpc.liebi.com/ws'
  }
}

export default config
