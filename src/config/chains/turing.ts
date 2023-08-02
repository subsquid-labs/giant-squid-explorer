import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'turing',
  prefix: 'turing',
  dataSource: {
    archive: 'https://turing.archive.subsquid.io/graphql',
    chain: 'wss://rpc.turing.oak.tech'
  }
}

export default config
