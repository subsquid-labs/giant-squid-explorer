module.exports = class Indexes1873961028900 {
  name = 'Indexes1873961028900';

  async up(db) {
    await db.query(`CREATE INDEX "event_args_str_gin" ON "event" USING GIN ("args_str") `);
    await db.query(`CREATE INDEX "call_args_str_gin" ON "call" USING GIN ("args_str") `);
    await db.query(`CREATE INDEX "call_name_pallet_parent" ON "call" ("call_name", "pallet_name", "parent_id") `)
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."event_args_str_gin"`);
    await db.query(`DROP INDEX "public"."call_args_str_gin"`);
    await db.query(`DROP INDEX "public"."call_name_pallet_parent"`);
  }
};