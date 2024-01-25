# Giant Squid Explorer

## Supported chains

- acala
- astar
- bifrost
- calamari
- efinity
- gmordie
- hydradx
- interlay
- karura
- khala
- kusama
- moonbeam
- moonriver
- phala
- polkadot
- rococo
- shibuya
- shiden
- statemine
- statemint
- subsocial

You can run this squid with other networks, including the networks without an ArrowSquid [Subsquid Network dataset](https://docs.subsquid.io/subsquid-network/reference/substrate-networks/). To do so, inspect the files in `./src/config/chains` and `./manifests` folders and make equivalent files for your network:

* In the chain config file, use a [Subsquid alias](https://docs.subsquid.io/subsquid-network/reference/substrate-networks/) as `chainName` if a dataset is available. Keep in mind that without a Subsquid Network dataset your squid will get all of its data from RPC. That generally means slow sync and high RPC endpoint requirements.
* Use the [spec](https://docs.subsquid.io/cloud/reference/manifest/) when writing the squid manifest. If you're going to deploy to [Subsquid Cloud](https://docs.subsquid.io/cloud/), request appropriate resources in the [`scale` section](https://docs.subsquid.io/cloud/reference/scale/). Consider using the [RPC proxy](https://docs.subsquid.io/cloud/reference/rpc-proxy/) service if your RPC requirements are high.

## Usage

### Prerequisites

- NodeJS v16 or newer
- Git
- [Squid CLI](https://docs.subsquid.io/squid-cli/installation/)
- Docker (for local runs and self-hosting)

Begin by retrieving the repo and installing the dependencies:
```bash
git clone https://github.com/subsquid-labs/giant-squid-explorer
cd giant-squid-explorer
npm ci
```

### Running locally

```bash
sqd build
sqd up
sqd migration:apply
sqd run . -m manifests/<your_network_name>.yaml
```
GraphiQL playground will be available at [http://localhost:4350/graphql](http://localhost:4350/graphql).

### Deploying to Subsquid Cloud

1. Create an account at [Subsquid Cloud](https://app.subsquid.io)
2. Make sure you understand our [pricing](https://docs.subsquid.io/cloud/pricing/)
3. Deploy your squid with
   ```bash
   sqd deploy . -m manifests/<your_network_name>.yaml
   ```
   If you get a
   ```
   Squid "gs-explorer-<your_network_name>" belongs to other project. Please choose another project for your squid
   ```
   error, change the squid name at `manifests/<your_network_name>.yaml` and retry.
4. Once the deployment is complete you'll be able to get an endpoint URL in the [Subsquid Cloud app](https://app.subsquid.io)

### Self-hosting

See [this page](https://docs.subsquid.io/sdk/resources/basics/self-hosting/).

## Troubleshooting

### Custom migration with GIN indexes for args fields

```javascript
module.exports = class Data1672344080480 {
  name = 'Data1672344080480'

  async up(db) {
    await db.query(
      `CREATE INDEX "event_args_str_gin" ON "event" USING GIN ("args_str") `
    )
    await db.query(
      `CREATE INDEX "call_args_str_gin" ON "call" USING GIN ("args_str") `
    )
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."event_args_str_gin"`)
    await db.query(`DROP INDEX "public"."call_args_str_gin"`)
  }
}
```
