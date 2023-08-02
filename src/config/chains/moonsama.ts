import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'moonsama',
  prefix: 'moonsama',
  dataSource: {
    archive: 'https://moonsama.archive.subsquid.io/graphql',
    chain: 'https://rpc.moonsama.com'
  }
}

export default config
