'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Feed extends Model {
    user() {
        return this.belongsTo('App/Models/User').select('id','firstName','lastName','profilePic')
    }
    comment() {
        return this.hasOne('App/Models/Comment')
    }
     hasUserLike() {
        return this.hasOne('App/Models/Like')
    }
     likes() {
        return this.hasMany('App/Models/Like')
    }
}

module.exports = Feed
