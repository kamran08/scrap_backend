'use strict'
const { validate, rule } = use('Validator')

class CommentValidation {
    commentEditRules(){
        return {
          id: 'required',
          user_id: 'required',
          commentTxt: 'required',
      }
    }
    
    
    async validateEditComment (data) {
        return validate(data, this.commentEditRules())
      }
} 

module.exports = CommentValidation