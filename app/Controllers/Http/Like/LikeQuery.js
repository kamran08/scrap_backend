'use strict'
const Like = use('App/Models/Like')
const Feed = use('App/Models/Feed')
const Comment = use('App/Models/Comment')
const CommentLike = use('App/Models/CommentLike')
const ReplyLike = use('App/Models/ReplyLike')
const Reply = use('App/Models/Reply')
class LikeQuery{
    async getFeedInfo(feed_id, uid){
      return Feed.query().where('id', feed_id).select('id').with('hasUserLike', (b)=>{
        b.where('user_id', uid)
      })
      .first()
    }
    async deleteOrCreateLike(likeData, isLike){
      if(!isLike){
          return Like.create(likeData)
       }
       return Like.query().where('user_id', likeData.user_id).where('feed_id', likeData.feed_id).delete()

    }

   //  comment like 
    async getCommentInfo(comment_id, uid){
      return Comment.query().where('id', comment_id).select('id').with('hasUserLike', (b)=>{
        b.where('user_id', uid)
      })
      .first()
    }
    async deleteOrCreateCommentLike(likeData, isLike){
      if(!isLike){
          return CommentLike.create(likeData)
       }
       return CommentLike.query().where('user_id', likeData.user_id).where('comment_id', likeData.comment_id).delete()

    }

   //  reply like 

    async getReplyInfo(reply_id, uid){
      return Reply.query().where('id', reply_id).select('id').with('hasUserLike', (b)=>{
        b.where('user_id', uid)
      })
      .first()
    }
    async deleteOrCreateReplyLike(likeData, isLike){
      if(!isLike){
          return ReplyLike.create(likeData)
       }
       return ReplyLike.query().where('user_id', likeData.user_id).where('reply_id', likeData.reply_id).delete()

    }
   //  async updateFeedLike(likesMeta, id){
   //     return Feed.query().where('id', id).update(likesMeta)
   //  }
}


module.exports = LikeQuery
