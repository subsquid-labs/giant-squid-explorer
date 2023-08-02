import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'foucoco',
  prefix: 'foucoco',
  dataSource: {
    archive: 'https://foucoco.archive.subsquid.io/graphql',
    chain: 'wss://pencol-roa-00.pendulumchain.tech'
  }
}

export default config
