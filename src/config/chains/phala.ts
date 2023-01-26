import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'phala',
  prefix: 'phala',
  dataSource: {
    archive: 'https://phala.archive.subsquid.io/graphql',
    chain: 'wss://api.phala.network/ws'
  }
}

export default config
