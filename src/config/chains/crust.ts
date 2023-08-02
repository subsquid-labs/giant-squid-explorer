import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'crust',
  prefix: 'crust',
  dataSource: {
    archive: 'https://crust.archive.subsquid.io/graphql',
    chain: 'wss://crust.api.onfinality.io/public-ws'
  }
}

export default config
