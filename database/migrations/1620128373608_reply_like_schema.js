'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplyLikeSchema extends Schema {
  up () {
    this.create('reply_likes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('reply_likes')
  }
}

module.exports = ReplyLikeSchema
