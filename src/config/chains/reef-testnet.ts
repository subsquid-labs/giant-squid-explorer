import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'reef-testnet',
  prefix: 'reef-testnet',
  dataSource: {
    archive: 'https://reef-testnet.archive.subsquid.io/graphql',
    chain: 'wss://rpc-testnet.reefscan.info/ws'
  }
}

export default config
