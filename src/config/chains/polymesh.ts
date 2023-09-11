import { ProcessorConfig } from '../processorConfig'
import * as typesBundle from '../../types/polymesh.json'

const config: ProcessorConfig = {
  chainName: 'polymesh',
  prefix: 'polymesh',
  dataSource: {
    archive: 'https://polymesh.archive.subsquid.io/graphql',
    chain: 'wss://mainnet-rpc.polymesh.network'
  },
  // https://github.com/PolymeshAssociation/polymesh-types
  typesBundle: typesBundle
}

export default config
