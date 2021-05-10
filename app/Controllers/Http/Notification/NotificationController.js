'use strict'
const NotificationService = use('./NotificationService')

class NotificationController {

  constructor(){
      this.notificationService = new NotificationService()
  }
 async getNotification(ctx){
      return this.notificationService.getNotification(ctx)
  }
  async createNotification(ctx){
      return this.notificationService.createNotification(ctx)
  }
 
  async deleteNotification(ctx){
    return this.notificationService.deleteNotification(ctx)
  }

}


module.exports = NotificationController
