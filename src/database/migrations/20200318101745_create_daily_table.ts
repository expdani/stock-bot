import * as Knex from "knex";

const TABLE_NAME = "daily";

/**
 * Method creates daily table.
 */
export async function up(knex: Knex) {
    return knex.schema.createTable(TABLE_NAME, function (table) {
        table.increments("id");
        /**
         * The id of the Discord user
         */
        table.string("userID").notNullable();
        /**
         * Created_at and deleted_at
         */
        table.timestamps();
    });
}

/**
 * Method drops daily table.
 */
export async function down(knex: Knex) {
    return knex.schema.dropTable(TABLE_NAME);
}
