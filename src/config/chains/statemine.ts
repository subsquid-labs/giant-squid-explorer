import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'statemine',
  prefix: 'statemine',
  dataSource: {
    archive: 'https://statemine.archive.subsquid.io/graphql',
    chain: 'wss://statemine-rpc.polkadot.io'
  }
}

export default config
