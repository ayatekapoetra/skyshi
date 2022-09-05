'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Todo extends Model {
    static get table(){
        return 'todos'
    }

    activity () {
        return this.belongsTo("App/Models/Activity", "activity_group_id", "id")
    }
}

module.exports = Todo
