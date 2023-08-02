import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'myriad',
  prefix: 'myriad',
  dataSource: {
    archive: 'https://myriad.archive.subsquid.io/graphql',
    chain: 'wss://ws-rpc.myriad.social'
  }
}

export default config
