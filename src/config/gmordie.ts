import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'gmordie',
    prefix: 'gmordie',
    dataSource: {
      archive: 'https://gmordie.archive.subsquid.io/graphql',
      chain: 'wss://kusama.gmordie.com'
    },
    batchSizeSaveThreshold: 5000
  }
};

export default config;
