import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'efinity',
  prefix: 'efinity',
  dataSource: {
    archive: 'https://efinity.archive.subsquid.io/graphql',
    chain: 'wss://rpc.efinity.io'
  }
}

export default config
