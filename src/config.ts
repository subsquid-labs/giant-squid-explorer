

export const processorConfig = {
  chainName: 'gmordie',
  prefix: 'gmordie',
  dataSource: {
    archive: 'https://gmordie.archive.subsquid.io/graphql',
    chain: 'wss://kusama-rpc.polkadot.io'
  },
  typesBundle: 'gmordie',
  blockRange: {
    from: 100000
  }
};
