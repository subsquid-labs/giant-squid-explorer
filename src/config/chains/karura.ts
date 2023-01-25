import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'karura',
  prefix: 'karura',
  dataSource: {
    archive: 'https://karura.archive.subsquid.io/graphql',
    chain: 'wss://karura-rpc-2.aca-api.network/ws'
  }
}

export default config
