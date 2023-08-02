import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'ternoa',
  prefix: 'ternoa',
  dataSource: {
    archive: 'https://ternoa.archive.subsquid.io/graphql',
    chain: 'wss://mainnet.ternoa.network'
  }
}

export default config
