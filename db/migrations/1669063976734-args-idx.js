module.exports = class Data1669063976734 {
  name = 'Data1669063976734'

  async up(db) {
    await db.query(`CREATE EXTENSION pg_trgm `)
    await db.query(`CREATE INDEX "event_args_gin" ON "event" USING GIN ("args_str" gin_trgm_ops) `)
    await db.query(`CREATE INDEX "call_args_gin" ON "call" USING GIN ("args_str" gin_trgm_ops) `)

  }

  async down(db) {
    await db.query(`DROP INDEX "public"."event_args_gin"`)
    await db.query(`DROP INDEX "public"."call_args_gin"`)
  }
}
