import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'litmus',
  prefix: 'litmus',
  dataSource: {
    archive: 'https://litmus.archive.subsquid.io/graphql',
    chain: 'wss://rpc.litmus-parachain.litentry.io'
  }
}

export default config
