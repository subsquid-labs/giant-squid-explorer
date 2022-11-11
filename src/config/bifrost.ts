import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'bifrost',
    prefix: 'bifrost',
    dataSource: {
      archive: 'https://bifrost.archive.subsquid.io/graphql',
      chain: 'wss://eu.bifrost-rpc.liebi.com/ws'
    },
    batchSizeSaveThreshold: 5000
  },
  threadsList: [
    {
      index: 0,
      from: 0,
      to: 750000,
      retriesLimit: 5,
      prometheusPort: 3001
    },
    {
      index: 1,
      from: 750000,
      to: 1500000,
      retriesLimit: 5,
      prometheusPort: 3002
    },
    {
      index: 2,
      from: 1500000,
      to: 2250000,
      retriesLimit: 5,
      prometheusPort: 3003
    },
    { index: 3, from: 2250000, retriesLimit: -1, prometheusPort: 3000 }
  ]
};

export default config;
