import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'gmordie',
    prefix: 'gm',
    dataSource: {
      archive: 'https://gmordie.archive.subsquid.io/graphql',
      chain: 'wss://kusama.gmordie.com'
    }
  },
  batchSizeSaveThreshold: 5000,
  argsStringMaxLengthLimit: 70
};

export default config;
