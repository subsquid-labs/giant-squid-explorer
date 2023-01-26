import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'moonbeam',
  dataSource: {
    archive: 'https://moonbeam.archive.subsquid.io/graphql',
    chain: 'wss://wss.api.moonbeam.network'
  }
}

export default config
