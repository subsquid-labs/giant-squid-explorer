import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://subsocial.archive.subsquid.io/graphql',
    chain: 'wss://para.f3joule.space'
  }
}

export default config
