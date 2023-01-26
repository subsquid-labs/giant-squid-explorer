import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'calamari',
  prefix: 'calamari',
  dataSource: {
    archive: 'https://calamari.archive.subsquid.io/graphql',
    chain: 'wss://ws.calamari.systems/'
  }
}

export default config
