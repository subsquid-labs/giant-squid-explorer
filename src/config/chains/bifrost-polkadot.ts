import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'bifrost-polkadot',
  prefix: 'bifrost-polkadot',
  dataSource: {
    archive: 'https://bifrost-polkadot.archive.subsquid.io/graphql',
    chain: 'wss://hk.p.bifrost-rpc.liebi.com/ws'
  }
}

export default config
