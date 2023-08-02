import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'picasso',
  prefix: 'picasso',
  dataSource: {
    archive: 'https://picasso.archive.subsquid.io/graphql',
    chain: 'wss://rpc.composablenodes.tech'
  }
}

export default config
