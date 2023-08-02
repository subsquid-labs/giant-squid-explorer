import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'reef',
  prefix: 'reef',
  dataSource: {
    archive: 'https://reef.archive.subsquid.io/graphql',
    chain: 'wss://rpc.reefscan.info/ws'
  }
}

export default config
