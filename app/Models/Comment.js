'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
    feed() {
        return this.belongsTo('App/Models/Feed')
    }
    user() {
        return this.belongsTo('App/Models/User').select('id', 'firstName', 'lastName', 'profilePic')
    }
    hasUserLike() {
        return this.hasOne('App/Models/CommentLike')
    }
    likes() {
        return this.hasMany('App/Models/CommentLike')
    }
}

module.exports = Comment
