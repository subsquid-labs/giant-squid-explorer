import { ProcessorConfig } from '../processorConfig';

const config: ProcessorConfig = {
  chainName: 'astar',
  prefix: 'astar',
  dataSource: {
    archive: 'https://astar.archive.subsquid.io/graphql',
    chain: 'wss://rpc.astar.network'
  }
};

export default config;