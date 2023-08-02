import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'invarch-tinkernet',
  prefix: 'invarch-tinkernet',
  dataSource: {
    archive: 'https://invarch-tinkernet.archive.subsquid.io/graphql',
    chain: 'wss://invarch-tinkernet.api.onfinality.io/public-ws'
  }
}

export default config
