import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'altair',
  prefix: 'altair',
  dataSource: {
    archive: 'https://altair.archive.subsquid.io/graphql',
    chain: 'wss://fullnode.altair.centrifuge.io'
  }
}

export default config
