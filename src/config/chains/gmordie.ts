import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'gmordie',
  prefix: 'gm',
  dataSource: {
    archive: 'https://gmordie.archive.subsquid.io/graphql',
    chain: 'wss://kusama.gmordie.com'
  }
}

export default config
