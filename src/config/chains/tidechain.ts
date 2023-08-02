import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'tidechain',
  prefix: 'tidechain',
  dataSource: {
    archive: 'https://tidechain.archive.subsquid.io/graphql',
    chain: 'wss://rpc.tidefi.io'
  }
}

export default config
