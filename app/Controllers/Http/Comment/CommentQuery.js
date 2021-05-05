'use strict'
const Comment = use('App/Models/Comment')

class CommentQuery {
    
    async createComment(comment){
        let com= await Comment.create(comment)
        return Comment.query().where('id', com.id).with('hasUserLike',(builder) => {
            builder.where('user_id', comment.user_id)
        }).withCount('likes').with('user').first()
         
     }
     
    async getComment(column, vlaue,uid){
        return Comment.query().where(column, vlaue).with('hasUserLike',(builder) => {
            builder.where('user_id', uid)
        }).withCount('likes').orderBy('id','desc').with('user').fetch()
     }
     
    async deleteComment(column, vlaue, userColumn, userValue){
        return Comment.query().where(column, vlaue).where(userColumn, userValue).delete()
     }
     
    async editComment(column, vlaue, userColumn, userValue, comment){
        return Comment.query().where(column, vlaue).where(userColumn, userValue).update(comment)
     }
     
     
}

module.exports = CommentQuery