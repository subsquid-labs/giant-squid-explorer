import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'darwinia',
  prefix: 'darwinia',
  dataSource: {
    archive: 'https://darwinia.archive.subsquid.io/graphql',
    chain: 'wss://parachain-rpc.darwinia.network'
  }
}

export default config
