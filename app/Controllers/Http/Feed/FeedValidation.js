'use strict' 

const { validate, rule } = use('Validator')

class FeedValidation {
    feedCreateRules(){
        return {
          user_id: 'required',
          feedTxt: 'required',
      }
    }
    
    
    async validateCreateFeed (data) {
        return validate(data, this.feedCreateRules())
      }
      
      feedDeleteRules(){
          return {
            feed_id: 'required',
            user_id: 'required'
        }
      }
    
    
    async validateDeleteFeed (data) {
        return validate(data, this.feedDeleteRules())
      }
      
        
    feedEditRules(){
      return {
          feed_id: 'required',
          user_id: 'required',
          feedTxt: 'required',
        }
      }
  
  
    async validateEditFeed (data) {
        return validate(data, this.feedEditRules())
      }
}

module.exports = FeedValidation