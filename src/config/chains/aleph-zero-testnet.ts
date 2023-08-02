import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'aleph-zero-testnet',
  prefix: 'aleph-zero-testnet',
  dataSource: {
    archive: 'https://aleph-zero-testnet.archive.subsquid.io/graphql',
    chain: 'wss://ws.test.azero.dev'
  }
}

export default config
