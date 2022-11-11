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
  },
  threadsList: [
    {
      index: 0,
      from: 0,
      to: 100000,
      retriesLimit: 5,
      prometheusPort: 3001
    },
    {
      index: 1,
      from: 100000,
      to: 200000,
      retriesLimit: 5,
      prometheusPort: 3002
    },
    {
      index: 2,
      from: 200000,
      to: 300000,
      retriesLimit: 5,
      prometheusPort: 3003
    },
    { index: 3, from: 300000, retriesLimit: -1, prometheusPort: 3000 }
  ]
};

export default config;
