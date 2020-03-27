
/** 
 * Método up: Responsável pela criação da tabela na migration quando a 
 * migration é executada
 * */

exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    // Limite de catacter
    table.string('uf', 2).notNullable();
  });
};

// Em caso da migration ser deletada ou precisa fazer rollback na tabela
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
