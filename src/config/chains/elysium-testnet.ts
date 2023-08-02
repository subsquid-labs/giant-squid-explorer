import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'elysium-testnet',
  prefix: 'elysium-testnet',
  dataSource: {
    archive: 'https://elysium-testnet.archive.subsquid.io/graphql',
    chain: 'wss://ws.atlantischain.network'
  }
}

export default config
