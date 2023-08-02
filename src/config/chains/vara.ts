import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'vara',
  prefix: 'vara',
  dataSource: {
    archive: 'https://vara.archive.subsquid.io/graphql',
    chain: 'wss://archive-rpc.vara-network.io'
  }
}

export default config
