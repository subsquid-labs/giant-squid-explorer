import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'aleph-zero',
  prefix: 'aleph-zero',
  dataSource: {
    archive: 'https://aleph-zero.archive.subsquid.io/graphql',
    chain: 'wss://ws.azero.dev'
  }
}

export default config
