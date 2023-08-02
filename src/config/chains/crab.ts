import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'crab',
  prefix: 'crab',
  dataSource: {
    archive: 'https://crab.archive.subsquid.io/graphql',
    chain: 'wss://crab-rpc.darwinia.network'
  }
}

export default config
