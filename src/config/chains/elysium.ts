import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'elysium',
  prefix: 'elysium',
  dataSource: {
    archive: 'https://elysium.archive.subsquid.io/graphql',
    chain: 'wss://ws.elysiumchain.tech'
  }
}

export default config
