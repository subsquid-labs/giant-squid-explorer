import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'hashed',
  prefix: 'hashed',
  dataSource: {
    archive: 'https://hashed.archive.subsquid.io/graphql',
    chain: 'wss://c1.hashed.live'
  }
}

export default config
