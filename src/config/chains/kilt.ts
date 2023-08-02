import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'kilt',
  prefix: 'kilt',
  dataSource: {
    archive: 'https://kilt.archive.subsquid.io/graphql',
    chain: 'wss://spiritnet.kilt.io'
  }
}

export default config
