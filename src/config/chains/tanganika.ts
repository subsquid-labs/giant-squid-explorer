import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'tanganika',
  prefix: 'tanganika',
  dataSource: {
    archive: 'https://tanganika.archive.subsquid.io/graphql',
    chain: 'wss://tanganika-archive.datahighway.com'
  }
}

export default config
