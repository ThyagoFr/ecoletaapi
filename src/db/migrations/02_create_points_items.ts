import Knex from "knex";

export async function up(knex: Knex) {
  console.log("creating point_item table ...");
  return await knex.schema.createTable("point_item", table => {
    table.increments('id_point_item').primary();
    table.integer('id_point') 
          .unsigned()
          .references('id')
          .inTable("points");
    table.integer('id_item') 
          .unsigned()
          .references('id')
          .inTable("items");
  })
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("point_item");
}