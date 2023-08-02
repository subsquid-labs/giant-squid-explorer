import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'kabocha',
  prefix: 'kabocha',
  dataSource: {
    archive: 'https://kabocha.archive.subsquid.io/graphql',
    chain: 'wss://kabocha.jelliedowl.net'
  }
}

export default config
