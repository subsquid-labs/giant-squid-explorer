const fs = require('fs')

let processorConfig =
`import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: '${process.argv[2]}',
  prefix: '${process.argv[2]}',
  dataSource: {
    archive: '${process.argv[3]}',
    chain: '${process.argv[4]}'
  }
}

export default config
`

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

let manifest =
`manifestVersion: subsquid.io/v0.1
name: gs-explorer-${process.argv[2]}
version: 1
description: |-
  Giant Squid Explorer for ${toTitleCase(process.argv[2].split('-').join(' '))} chain
build:

deploy:
  addons:
    postgres:
  processor:
    env:
      CHAIN:
        ${process.argv[2]}
    cmd: [ "node", "lib/processor" ]
  api:
    cmd: [ "npx", "squid-graphql-server", "--dumb-cache", "in-memory", "--dumb-cache-ttl", "1000", "--dumb-cache-size", "100", "--dumb-cache-max-age", "1000" ]

scale:
  addons:
    postgres:
      storage: 25G
      profile: small`

fs.writeFileSync(`./src/config/chains/${process.argv[2]}.ts`, processorConfig);
fs.writeFileSync(`./manifests/${process.argv[2]}.yaml`, manifest);