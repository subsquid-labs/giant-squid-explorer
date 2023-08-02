import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'pangoro',
  prefix: 'pangoro',
  dataSource: {
    archive: 'https://pangoro.archive.subsquid.io/graphql',
    chain: 'wss://pangoro-rpc.darwinia.network'
  }
}

export default config
