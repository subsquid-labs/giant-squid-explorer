import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'pangolin',
  prefix: 'pangolin',
  dataSource: {
    archive: 'https://pangolin.archive.subsquid.io/graphql',
    chain: 'wss://pangolin-rpc.darwinia.network'
  }
}

export default config
