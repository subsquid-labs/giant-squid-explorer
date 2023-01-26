# Multichain Giant Squid Explorer

### Supported chains:

- acala
- bifrost
- crust
- gmordie
- karura
- kusama (`sqd deploy https://github.com/subsquid/caller-squid\#multi-chain -m manifest/squid-kusama.yaml`)
- moonbeam (`sqd deploy https://github.com/subsquid/caller-squid\#multi-chain -m manifest/squid-moonbeam.yaml`)
- moonriver (`sqd deploy https://github.com/subsquid/caller-squid\#multi-chain -m manifest/squid-moonriver.yaml`)
- phala
- polkadot (`sqd deploy https://github.com/subsquid/caller-squid\#multi-chain -m manifest/squid-polkadot.yaml`)

## Custom migration with GIN indexes for args fields

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
