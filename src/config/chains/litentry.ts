import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'litentry',
  prefix: 'litentry',
  dataSource: {
    archive: 'https://litentry.archive.subsquid.io/graphql',
    chain: 'wss://rpc.litentry-parachain.litentry.io'
  }
}

export default config
