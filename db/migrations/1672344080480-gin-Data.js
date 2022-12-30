module.exports = class Data1672344080480 {
  name = 'Data1672344080480';

  async up(db) {
    await db.query(`CREATE EXTENSION pg_trgm `);
    await db.query(
      `CREATE INDEX "event_args_str_gin" ON "event" USING GIN ("args_str") `
    );
    await db.query(
      `CREATE INDEX "call_args_str_gin" ON "call" USING GIN ("args_str") `
    );
    await db.query(
      `CREATE INDEX "event_args_json_gin" ON "event" USING GIN ("args_json") `
    );
    await db.query(
      `CREATE INDEX "call_args_json_gin" ON "call" USING GIN ("args_json") `
    );
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."event_args_str_gin"`);
    await db.query(`DROP INDEX "public"."call_args_str_gin"`);
    await db.query(`DROP INDEX "public"."event_args_json_gin"`);
    await db.query(`DROP INDEX "public"."call_args_json_gin"`);
  }
};
