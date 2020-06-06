import Knex from "knex";

export async function up(knex: Knex) {
  console.log("creating points table ... ");
  return await knex.schema.createTable("points", table => {
    table.increments("id").primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.string('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf',2).notNullable();
  })
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("points");
}