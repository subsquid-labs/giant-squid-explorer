import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'frequency',
  prefix: 'frequency',
  dataSource: {
    archive: 'https://frequency.archive.subsquid.io/graphql',
    chain: 'wss://0.rpc.frequency.xyz'
  }
}

export default config
