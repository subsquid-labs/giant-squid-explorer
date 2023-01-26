import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'rococo',
  prefix: 'rococo',
  dataSource: {
    archive: 'https://rococo.archive.subsquid.io/graphql',
    chain: 'wss://rococo-rpc.polkadot.io'
  }
}

export default config
