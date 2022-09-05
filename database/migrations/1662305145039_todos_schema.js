'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodosSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments()
      table.integer('activity_group_id').unsigned().references('id').inTable('activities')
      table.string('title', 200).notNullable()
      table.enu('is_active', [0, 1]).defaultTo(1)
      table.enu('priority', 50).defaultTo('very-high')
      table.timestamps()
      table.timestamp('deleted_at').defaultTo(null)
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodosSchema
