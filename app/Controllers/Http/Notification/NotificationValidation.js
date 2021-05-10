const { validateAll } = use('Validator')
class NotificationValidation {

    createRules(){
      return {
        id: 'required',
      }
    }

    async validateNotificationData(data){
      return validateAll(data, this.createRules())
    }
   

}

module.exports = NotificationValidation
