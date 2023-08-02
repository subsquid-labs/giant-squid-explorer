import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'xx-network',
  prefix: 'xx-network',
  dataSource: {
    archive: 'https://xx-network.archive.subsquid.io/graphql',
    chain: 'wss://xx.api.onfinality.io/public-ws'
  }
}

export default config
