import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'heiko',
  prefix: 'heiko',
  dataSource: {
    archive: 'https://heiko.archive.subsquid.io/graphql',
    chain: 'wss://heiko-rpc.parallel.fi'
  }
}

export default config
