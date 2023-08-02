import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'robonomics',
  prefix: 'robonomics',
  dataSource: {
    archive: 'https://robonomics.archive.subsquid.io/graphql',
    chain: 'wss://kusama.rpc.robonomics.network'
  }
}

export default config
