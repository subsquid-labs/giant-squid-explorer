import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'karura',
    prefix: 'karura',
    dataSource: {
      archive: 'https://karura.archive.subsquid.io/graphql',
      chain: 'wss://karura-rpc-2.aca-api.network/ws'
    },
    batchSizeSaveThreshold: 3000
  },
};

export default config;
