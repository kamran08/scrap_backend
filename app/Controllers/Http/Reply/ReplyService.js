'use strict'

const ReplyValidator = use('./ReplyValidation')
const ReplyQuery = use('./ReplyQuery')

class ReplyService {
    constructor(){
        this.ReplyValidator = new ReplyValidator()
        this.ReplyQuery = new ReplyQuery()
      }
      
      
      async createReply(ctx){
       let data = ctx.request.all()
       
       const validation = await this.ReplyValidator.validateCreateComment(data)
       
       if (validation.fails()) {
        return ctx.response.status(401).send(validation.messages())
        }
        const reply =  await this.ReplyQuery.createReply({
          user_id : data.user_id,
          comment_id : data.comment_id,
          replyTxt : data.replyTxt,
          
        })
        
        return this.ReplyQuery.getSingleReply('id', reply.id,ctx.auth.user.id)
        
      }
      
      async getReply(ctx){
          let replyData = await this.ReplyQuery.getReply('comment_id', ctx.params.id,ctx.auth.user.id)
          replyData = replyData.toJSON()
          for(let i of replyData){
            i.isEdit = false
           
          }
          return replyData
      }
      
      async deleteReply(ctx){
        let data =ctx.request.all()
        const validation = await this.ReplyValidator.validateDeleteComment(data)
      
        if (validation.fails()) {
          return ctx.response.status(401).send(validation.messages())
        }
          let deleteReply = await this.ReplyQuery.deleteReply('id', data.reply_id, 'user_id', data.user_id)
          return deleteReply
      }
      
      async editReply(ctx){
        let data =ctx.request.all()
        const validation = await this.ReplyValidator.validateEditReply(data)
      
        if (validation.fails()) {
          return ctx.response.status(401).send(validation.messages())
        }
        
          let editReply = await this.ReplyQuery.editReply('id', data.id, 'user_id', data.user_id,{
            replyTxt: data.replyTxt
          })
          
          return editReply
          
      }
      
      
      
      
      
      
      
      
      
}

module.exports = ReplyService