module.exports = class Data1674227692691 {
  name = 'Data1674227692691'

  async up(db) {
    await db.query(`DROP INDEX "public"."IDX_6eb8f0521afac51d39440c61fa"`)
    await db.query(`DROP INDEX "public"."IDX_31a39e0ac38c2063844eb6be42"`)
    await db.query(`DROP INDEX "public"."call_search"`)
    await db.query(`CREATE INDEX "call_filter" ON "call" ("id", "pallet_name", "call_name") `)
    await db.query(`CREATE INDEX "call_filter_extr" ON "call" ("id", "parent_id", "pallet_name", "call_name") `)
    await db.query(`CREATE INDEX "event_filter" ON "event" ("id", "pallet_name", "event_name")`)
  }

  async down(db) {
    await db.query(`CREATE INDEX "IDX_6eb8f0521afac51d39440c61fa" ON "event" ("event_name", "pallet_name") `)
    await db.query(`CREATE INDEX "IDX_31a39e0ac38c2063844eb6be42" ON "call" ("call_name", "pallet_name") `)
    await db.query(`CREATE INDEX "call_search" ON "call" ("id", "parent_id", "call_name", "pallet_name") `)
    await db.query(`DROP INDEX "public"."call_filter"`)
    await db.query(`DROP INDEX "public"."call_filter_extr"`)
    await db.query(`DROP INDEX "public"."event_filter"`)
  }
}
