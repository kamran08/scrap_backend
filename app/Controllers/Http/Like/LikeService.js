'use strict'
const LikeValidation = use('./LikeValidation')
const LikeQuery = use('./LikeQuery')
class LikeService {
    constructor(){
      this.LikeValidation = new LikeValidation()
      this.likeQuery = new LikeQuery()
    }

    async createLike(ctx){
      const data = ctx.request.all()
      const validation = await this.LikeValidation.validateLikeData(data)
      if (validation.fails()) {
        return ctx.response.status(401).send({message: 'Invalid data sent for likes'})
      }

      let feed = await this.likeQuery.getFeedInfo(data.feed_id,ctx.auth.user.id)
      if(!feed) return ctx.response.status(404).send({message: 'This post has been deleted!'})
      feed = feed.toJSON()
    

      Promise.all([
        this.likeQuery.deleteOrCreateLike({feed_id : data.feed_id, user_id : ctx.auth.user.id},feed.hasUserLike),
        // this.likeQuery.updateFeedLike({likeCount : feed.likeCount}, data.feed_id)
      ])
      return feed
      
    }
    
    // comment like


    async createCommentLike(ctx){
      const data = ctx.request.all()
      const validation = await this.LikeValidation.validateCommentLikeData(data)
      if (validation.fails()) {
        return ctx.response.status(401).send({message: 'Invalid data sent for likes'})
      }

      let comment = await this.likeQuery.getCommentInfo(data.comment_id,ctx.auth.user.id)
      if(!comment) return ctx.response.status(404).send({message: 'This Comment has been deleted!'})
      comment = comment.toJSON()
    

      Promise.all([
        this.likeQuery.deleteOrCreateCommentLike({comment_id : data.comment_id, user_id : ctx.auth.user.id},comment.hasUserLike),
        // this.likeQuery.updatecommentLike({likeCount : comment.likeCount}, data.comment_id)
      ])
      return comment

    }

    // Reply like

    async createReplyLike(ctx){
      const data = ctx.request.all()
      const validation = await this.LikeValidation.validateReplyLikeData(data)
      if (validation.fails()) {
        return ctx.response.status(401).send({message: 'Invalid data sent for likes'})
      }

      let reply = await this.likeQuery.getReplyInfo(data.reply_id,ctx.auth.user.id)
      if(!reply) return ctx.response.status(404).send({message: 'This reply has been deleted!'})
      reply = reply.toJSON()
    

      Promise.all([
        this.likeQuery.deleteOrCreateReplyLike({reply_id : data.reply_id, user_id : ctx.auth.user.id},reply.hasUserLike),
        // this.likeQuery.updatereplyLike({likeCount : reply.likeCount}, data.reply_id)
      ])
      return reply

    }




}

module.exports = LikeService
