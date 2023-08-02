import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'westend-collectives',
  prefix: 'westend-collectives',
  dataSource: {
    archive: 'https://westend-collectives.archive.subsquid.io/graphql',
    chain: 'wss://sys.ibp.network/collectives-westend'
  }
}

export default config
