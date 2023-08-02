import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'joystream',
  prefix: 'joystream',
  dataSource: {
    archive: 'https://joystream.archive.subsquid.io/graphql',
    chain: 'wss://rpc.joystream.org'
  }
}

export default config
