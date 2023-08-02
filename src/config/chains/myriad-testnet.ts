import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'myriad-testnet',
  prefix: 'myriad-testnet',
  dataSource: {
    archive: 'https://myriad-testnet.archive.subsquid.io/graphql',
    chain: 'wss://ws-rpc.testnet.myriad.social'
  }
}

export default config
