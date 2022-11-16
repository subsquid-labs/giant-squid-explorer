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
  }
};

export default config;
