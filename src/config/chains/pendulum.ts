import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'pendulum',
  prefix: 'pendulum',
  dataSource: {
    archive: 'https://pendulum.archive.subsquid.io/graphql',
    chain: 'wss://rpc-pendulum.prd.pendulumchain.tech'
  }
}

export default config
