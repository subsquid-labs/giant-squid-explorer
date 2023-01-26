import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'statemint',
  prefix: 'statemint',
  dataSource: {
    archive: 'https://statemint.archive.subsquid.io/graphql',
    chain: 'wss://statemint-rpc.polkadot.io'
  }
}

export default config
