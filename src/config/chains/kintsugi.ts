import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'kintsugi',
  prefix: 'kintsugi',
  dataSource: {
    archive: 'https://kintsugi.archive.subsquid.io/graphql',
    chain: 'wss://api-kusama.interlay.io/parachain'
  }
}

export default config
