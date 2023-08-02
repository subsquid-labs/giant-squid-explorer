import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'frequency-testnet',
  prefix: 'frequency-testnet',
  dataSource: {
    archive: 'https://frequency-testnet.archive.subsquid.io/graphql',
    chain: 'wss://rpc.rococo.frequency.xyz'
  }
}

export default config
