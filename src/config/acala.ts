import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
      archive: 'https://acala.archive.subsquid.io/graphql',
      chain: 'wss://acala-rpc-2.aca-api.network/ws'
    },
    batchSizeSaveThreshold: 3000
  },
  threadsList: []
};

export default config;
