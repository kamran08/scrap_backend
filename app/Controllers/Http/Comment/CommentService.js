'use strict'

const CommentValidator = use('./CommentValidation')
const CommentQuery = use('./CommentQuery')

class CommentService {
    constructor(){
        this.CommentValidator = new CommentValidator()
        this.CommentQuery = new CommentQuery()
      }
      
      
      async createComment(ctx){
       let data = ctx.request.all()
        const comment =  await this.CommentQuery.createComment({
          user_id : ctx.auth.user.id,
          feed_id : data.feed_id,
          commentTxt : data.commentTxt,
          
        })
        
        return ctx.response.status(201).json(comment)
        
      }
      
      async getComment(ctx){
          let commentData = await this.CommentQuery.getComment('feed_id', ctx.params.id, ctx.auth.user.id)
          commentData = commentData.toJSON()
          for(let i of commentData){
            i.replies = []
            i.isOpen = false
            i.isEdit = false
          }
          return commentData
      }
      
      async deleteComment(ctx){
        let data =ctx.request.all()
          let deleteComment = await this.CommentQuery.deleteComment('id', data.comment_id, 'user_id', ctx.auth.user.id)
          return deleteComment
      }
      
      async editComment(ctx){
        let data =ctx.request.all()
        const validation = await this.CommentValidator.validateEditComment(data)
      
        if (validation.fails()) {
          return ctx.response.status(401).send(validation.messages())
        }
        
          let editComment = await this.CommentQuery.editComment('id', data.id, 'user_id', data.user_id,{
            commentTxt: data.commentTxt
          })
          
          return editComment
          
      }
      
      
      
      
      
      
      
      
      
}

module.exports = CommentService