import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'moonriver',
  dataSource: {
    archive: 'https://moonriver.archive.subsquid.io/graphql',
    chain: 'wss://wss.api.moonriver.moonbeam.network'
  }
}

export default config
