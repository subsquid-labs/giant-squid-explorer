import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'parallel',
  prefix: 'parallel',
  dataSource: {
    archive: 'https://parallel.archive.subsquid.io/graphql',
    chain: 'wss://rpc.parallel.fi'
  }
}

export default config
