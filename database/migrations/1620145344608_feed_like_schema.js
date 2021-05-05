'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedLikeSchema extends Schema {
  up () {
    this.create('feed_likes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('feed_likes')
  }
}

module.exports = FeedLikeSchema
