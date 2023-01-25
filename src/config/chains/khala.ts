
import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'khala',
  prefix: 'khala',
  dataSource: {
    archive: 'https://khala.archive.subsquid.io/graphql',
    chain: 'wss://khala-api.phala.network/ws'
  }
}

export default config
