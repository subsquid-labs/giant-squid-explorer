module.exports = class Data11669032871005 {
  name = 'Data11669032871005'

  async up(db) {
    await db.query(`CREATE INDEX "tmp_event_name_idx" ON "event" USING HASH ("name") `)
    await db.query(`DROP INDEX "IDX_b535fbe8ec6d832dde22065ebd" `)
    await db.query(`ALTER INDEX "tmp_event_name_idx" RENAME TO "IDX_b535fbe8ec6d832dde22065ebd" `)

    await db.query(`CREATE INDEX "tmp_call_name_idx" ON "call" USING HASH ("name") `)
    await db.query(`DROP INDEX "IDX_8b212022b7428232091e2f8aa5" `)
    await db.query(`ALTER INDEX "tmp_call_name_idx" RENAME TO "IDX_8b212022b7428232091e2f8aa5" `)

    await db.query(`CREATE INDEX "tmp_extrinsic_signer_idx" ON "extrinsic" USING HASH ("signer") `)
    await db.query(`DROP INDEX "IDX_001ddf290faf765f9dfd9154d3" `)
    await db.query(`ALTER INDEX "tmp_extrinsic_signer_idx" RENAME TO "IDX_001ddf290faf765f9dfd9154d3" `)
  }
}
