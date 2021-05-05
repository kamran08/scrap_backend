const { validateAll } = use('Validator')
class LikeValidation {

    createRules(){
      return {
        feed_id: 'required',
      }
    }

    async validateLikeData(data){
      return validateAll(data, this.createRules())
    }
    createLikeRules(){
      return {
        comment_id: 'required',
      }
    }

    async validateCommentLikeData(data){
      return validateAll(data, this.createLikeRules())
    }
    createReplyLikeRules(){
      return {
        reply_id: 'required',
      }
    }

    async validateReplyLikeData(data){
      return validateAll(data, this.createReplyLikeRules())
    }







}

module.exports = LikeValidation
