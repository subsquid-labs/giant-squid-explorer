import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'shibuya',
  prefix: 'shibuya',
  dataSource: {
    archive: 'https://shibuya.archive.subsquid.io/graphql',
    chain: 'wss://rpc.shibuya.astar.network'
  }
}

export default config
