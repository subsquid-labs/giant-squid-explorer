import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'manta',
  prefix: 'manta',
  dataSource: {
    archive: 'https://manta.archive.subsquid.io/graphql',
    chain: 'wss://ws.manta.systems'
  }
}

export default config
