import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'acala',
  prefix: 'acala',
  dataSource: {
    archive: 'https://acala.archive.subsquid.io/graphql',
    chain: 'wss://acala-rpc-2.aca-api.network/ws'
  }
}

export default config
