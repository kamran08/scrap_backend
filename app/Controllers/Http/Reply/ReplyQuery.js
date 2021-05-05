'use strict'
const Reply = use('App/Models/Reply')

class ReplyQuery {
    
    async createReply(reply){
        return Reply.create(reply)
     }
     
    async getReply(column, vlaue,uid){
        return Reply.query().where(column, vlaue).orderBy('id','Asc').with('user')
        .with('hasUserLike',(builder) => {
            builder.where('user_id', uid)
        }).withCount('likes')
        .fetch()
     }
    async getSingleReply(column, vlaue,uid){
        return Reply.query().where(column, vlaue).orderBy('id','Asc').with('user')
        .with('hasUserLike',(builder) => {
            builder.where('user_id', uid)
        }).withCount('likes')
        .first()
     }
     
    async deleteReply(column, vlaue, userColumn, userValue){
        return Reply.query().where(column, vlaue).where(userColumn, userValue).delete()
     }
     
    async editReply(column, vlaue, userColumn, userValue, comment){
        return Reply.query().where(column, vlaue).where(userColumn, userValue).update(comment)
     }
     
}

module.exports = ReplyQuery