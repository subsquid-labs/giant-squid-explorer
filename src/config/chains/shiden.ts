import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'shiden',
  prefix: 'shiden',
  dataSource: {
    archive: 'https://shiden.archive.subsquid.io/graphql',
    chain: 'wss://rpc.shiden.astar.network'
  }
}

export default config
