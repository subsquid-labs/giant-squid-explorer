import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'peaq',
  prefix: 'peaq',
  dataSource: {
    archive: 'https://peaq.archive.subsquid.io/graphql',
    chain: 'wss://wss.agung.peaq.network'
  }
}

export default config
