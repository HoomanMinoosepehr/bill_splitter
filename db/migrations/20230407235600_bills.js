/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bill' , table => {
    table.increments('id').primary();
    table.decimal('total');
    table.decimal('tTax');
    table.decimal('tipamount');
    table.decimal('tPay');
    table.decimal('each');
    table.timestamps(true , true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('bill')
};
