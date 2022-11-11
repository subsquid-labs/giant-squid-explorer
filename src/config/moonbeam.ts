import { ProcessorConfig } from './processorConfig';

const config: ProcessorConfig = {
  srcConfig: {
    chainName: 'moonbeam',
    prefix: 'moonbeam',
    dataSource: {
      archive: 'https://moonbeam.archive.subsquid.io/graphql',
      chain:
        'wss://rpc.pinknode.io/moonbeam/6e3fa591-e24f-483a-95fa-1d773f7f2be3'
    },
    batchSizeSaveThreshold: 3000
  },
  threadsList: []
};

export default config;
