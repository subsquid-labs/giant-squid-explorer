import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'crust',
    prefix: 'crust',
    dataSource: {
      archive: 'https://crust.archive.subsquid.io/graphql',
      chain: 'wss://rpc.crust.network'
    },
    batchSizeSaveThreshold: 3000
  },
};

export default config;
