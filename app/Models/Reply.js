'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reply extends Model {
    user() {
        return this.belongsTo('App/Models/User').select('id', 'firstName', 'lastName', 'profilePic')
    }
     hasUserLike() {
        return this.hasOne('App/Models/ReplyLike')
    }
     likes() {
        return this.hasMany('App/Models/ReplyLike')
    }
}

module.exports = Reply
