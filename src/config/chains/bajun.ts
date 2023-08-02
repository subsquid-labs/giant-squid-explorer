import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'bajun',
  prefix: 'bajun',
  dataSource: {
    archive: 'https://bajun.archive.subsquid.io/graphql',
    chain: 'wss://bajun.public.curie.radiumblock.co/ws'
  }
}

export default config
