import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'moonbeam',
    dataSource: {
      archive: 'https://moonbeam.archive.subsquid.io/graphql',
      chain:
        'wss://wss.api.moonbeam.network'
    },
    batchSizeSaveThreshold: 3000
  }
};

export default config;
