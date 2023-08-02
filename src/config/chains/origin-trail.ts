import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'origin-trail',
  prefix: 'origin-trail',
  dataSource: {
    archive: 'https://origin-trail.archive.subsquid.io/graphql',
    chain: 'wss://parachain-rpc.origin-trail.network'
  }
}

export default config
