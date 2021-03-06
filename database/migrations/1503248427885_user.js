'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('user_name').unique().notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('status').defaultTo('active')
      table.string('verify_code')
      table.string('forgot_code')
      table.string('gender').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
