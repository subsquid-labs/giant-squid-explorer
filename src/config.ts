

export const processorConfig = {
  chainName: 'kusama',
  prefix: 'kusama',
  dataSource: {
    archive: 'https://kusama.archive.subsquid.io/graphql',
    chain: 'wss://kusama-rpc.polkadot.io'
  },
  typesBundle: 'kusama',
  blockRange: {
    from: 100000
  }
};
