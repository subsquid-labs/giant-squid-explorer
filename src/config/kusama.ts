import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
      archive: 'https://kusama.archive.subsquid.io/graphql',
      chain: 'wss://kusama-rpc.polkadot.io'
    },
    batchSizeSaveThreshold: 3000
  },
  threadsList: [
    {
      index: 0,
      from: 0,
      to: 4000000,
      retriesLimit: 5,
      prometheusPort: 3001
    },
    {
      index: 1,
      from: 4000000,
      to: 8000000,
      retriesLimit: 5,
      prometheusPort: 3002
    },
    {
      index: 2,
      from: 8000000,
      to: 12000000,
      retriesLimit: 5,
      prometheusPort: 3003
    },
    { index: 3, from: 12000000, retriesLimit: -1, prometheusPort: 3000 }
  ]
};

export default config;
