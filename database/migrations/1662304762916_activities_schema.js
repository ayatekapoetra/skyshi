'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitiesSchema extends Schema {
  up () {
    this.create('activities', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('title', 200).notNullable()
      table.timestamp('deleted_at').defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('activities')
  }
}

module.exports = ActivitiesSchema
