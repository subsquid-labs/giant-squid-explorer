import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'moonriver',
    dataSource: {
      archive: 'https://moonriver.archive.subsquid.io/graphql',
      chain:
        'wss://wss.api.moonriver.moonbeam.network'
    },
    batchSizeSaveThreshold: 3000
  }
};

export default config;
