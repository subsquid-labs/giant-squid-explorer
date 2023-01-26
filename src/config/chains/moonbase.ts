import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'moonbase',
  dataSource: {
    archive: 'https://moonbase.archive.subsquid.io/graphql',
    chain: 'wss://wss.api.moonbase.moonbeam.network'
  }
}

export default config
