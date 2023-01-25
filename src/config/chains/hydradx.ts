import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'hydradx',
  prefix: 'hydradx',
  dataSource: {
    archive: 'https://hydradx.archive.subsquid.io/graphql',
    chain: 'wss://rpc.hydradx.cloud'
  }
}

export default config
