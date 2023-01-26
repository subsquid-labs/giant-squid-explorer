import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'interlay',
  prefix: 'interlay',
  dataSource: {
    archive: 'https://interlay.archive.subsquid.io/graphql',
    chain: 'wss://api.interlay.io/parachain'
  }
}

export default config
