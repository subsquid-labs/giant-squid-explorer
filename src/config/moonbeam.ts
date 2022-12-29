import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'moonbeam',
    dataSource: {
      archive: 'https://moonbeam.archive.subsquid.io/graphql',
      chain: 'wss://wss.api.moonbeam.network'
    }
  },
  batchSizeSaveThreshold: 1000,
  argsStringMaxLengthLimit: 70
};

export default config;
