import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 't0rn',
  prefix: 't0rn',
  dataSource: {
    archive: 'https://t0rn.archive.subsquid.io/graphql',
    chain: 'wss://ws.t0rn.io'
  }
}

export default config
