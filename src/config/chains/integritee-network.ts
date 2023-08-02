import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'integritee-network',
  prefix: 'integritee-network',
  dataSource: {
    archive: 'https://integritee-network.archive.subsquid.io/graphql',
    chain: 'wss://kusama.api.integritee.network'
  }
}

export default config
