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
}

module.exports = FeedValidation