import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'phala',
    prefix: 'phala',
    dataSource: {
      archive: 'https://phala.archive.subsquid.io/graphql',
      chain: 'wss://api.phala.network/ws'
    },
    batchSizeSaveThreshold: 3000
  }
};

export default config;
