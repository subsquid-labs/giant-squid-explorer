import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'equilibrium',
  prefix: 'equilibrium',
  dataSource: {
    archive: 'https://equilibrium.archive.subsquid.io/graphql',
    chain: 'wss://equilibrium-rpc.dwellir.com'
  }
}

export default config
