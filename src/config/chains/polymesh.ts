import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'polymesh',
  prefix: 'polymesh',
  dataSource: {
    archive: 'https://polymesh.archive.subsquid.io/graphql',
    chain: 'wss://mainnet-rpc.polymesh.network'
  }
}

export default config
