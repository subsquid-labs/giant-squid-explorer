import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'bitcountry-pioneer',
  prefix: 'bitcountry-pioneer',
  dataSource: {
    archive: 'https://bitcountry-pioneer.archive.subsquid.io/graphql',
    chain: 'wss://pioneer.api.onfinality.io/public-ws'
  }
}

export default config
