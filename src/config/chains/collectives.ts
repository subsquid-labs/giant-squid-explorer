import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'collectives',
  prefix: 'collectives',
  dataSource: {
    archive: 'https://collectives.archive.subsquid.io/graphql',
    chain: 'wss://polkadot-collectives-rpc.polkadot.io'
  }
}

export default config
