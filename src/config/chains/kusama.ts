import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'kusama',
  prefix: 'kusama',
  dataSource: {
    archive: 'https://kusama.archive.subsquid.io/graphql',
    chain: 'wss://kusama-rpc.polkadot.io'
  }
}

export default config
