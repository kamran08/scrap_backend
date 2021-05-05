'use strict'
const { validate, rule } = use('Validator')

class ReplyValidation {
    replyCreateRules(){
        return {
          user_id: 'required',
          comment_id: 'required',
          replyTxt: 'required',
      }
    }
    
    
    async validateCreateComment (data) {
        return validate(data, this.replyCreateRules())
      }
      
    replyDeleteRules(){
        return {
          user_id: 'required',
          reply_id: 'required'
      }
    }
    
    
    async validateDeleteComment (data) {
        return validate(data, this.replyDeleteRules())
      }
      
      
    replyEditRules(){
        return {
          id: 'required',
          user_id: 'required',
          replyTxt: 'required',
      }
    }
    
    
    async validateEditReply (data) {
        return validate(data, this.replyEditRules())
      }
      
      
      
} 

module.exports = ReplyValidation