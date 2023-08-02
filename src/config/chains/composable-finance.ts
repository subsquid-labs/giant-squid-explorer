import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'composable-finance',
  prefix: 'composable-finance',
  dataSource: {
    archive: 'https://composable-finance.archive.subsquid.io/graphql',
    chain: 'wss://composable.api.onfinality.io/public-ws'
  }
}

export default config
