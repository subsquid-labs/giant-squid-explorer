import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'efinity',
  prefix: 'efinity',
  dataSource: {
    archive: 'https://efinity.archive.subsquid.io/graphql',
    chain: 'wss://archive.matrix.blockchain.enjin.io'
  }
}

export default config
