import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'kusama',
  prefix: 'kusama',
  dataSource: {
    archive: 'https://v2.archive.subsquid.io/network/kusama',
    chain: 'wss://kusama-rpc.polkadot.io'
  }
}

export default config
