import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'bifrost',
    prefix: 'bifrost',
    dataSource: {
      archive: 'https://bifrost.archive.subsquid.io/graphql',
      chain: 'wss://eu.bifrost-rpc.liebi.com/ws'
    }
  },
  batchSizeSaveThreshold: 5000,
  argsStringMaxLengthLimit: 66
};

export default config;
