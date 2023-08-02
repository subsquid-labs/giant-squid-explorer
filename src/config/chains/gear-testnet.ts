import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'gear-testnet',
  prefix: 'gear-testnet',
  dataSource: {
    archive: 'https://gear-testnet.archive.subsquid.io/graphql',
    chain: 'wss://archive-node.gear-tech.io'
  }
}

export default config
