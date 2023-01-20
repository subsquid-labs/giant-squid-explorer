module.exports = class Indexes1883961028900 {
  name = 'Indexes1883961028900';

  async up(db) {
    await db.query(`DROP INDEX "public"."call_name_pallet_parent"`);
    await db.query(`CREATE INDEX "call_search" ON "call" ("id","pallet_name","call_name","parent_id") `)
  }

  async down(db) {
    await db.query(`CREATE INDEX "call_name_pallet_parent" ON "call" ("call_name", "pallet_name", "parent_id") `)
    await db.query(`DROP INDEX "public"."call_search"`);
  }
};