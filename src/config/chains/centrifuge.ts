import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'centrifuge',
  prefix: 'centrifuge',
  dataSource: {
    archive: 'https://centrifuge.archive.subsquid.io/graphql',
    chain: 'wss://centrifuge-parachain.api.onfinality.io/public-ws'
  }
}

export default config
