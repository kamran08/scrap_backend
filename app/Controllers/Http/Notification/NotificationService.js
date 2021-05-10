'use strict'
const NotificationValidation = use('./NotificationValidation')
const NotificationQuery = use('./NotificationQuery')
class NotificationService {
    constructor(){
      this.NotificationValidation = new NotificationValidation()
      this.notificationQuery = new NotificationQuery()
    }

    async getNotification(ctx){
      if(!ctx.auth.user || !ctx.auth.user.id) return []
       return await this.notificationQuery.getNotification(ctx.auth.user.id)
    }
    async createNotification(ctx){
      const data = ctx.request.all()
      const validation = await this.NotificationValidation.validateNotificationData(data)
      if (validation.fails()) {
        return ctx.response.status(401).send({message: 'Invalid data sent for notifications'})
      }
        const feed1 =  await this.notificationQuery.createNotification({
          to : ctx.auth.user.id,
          from : data.from,
          message : "some text",
          url: "url",
          url: "user/admin"
        })

      return feed
      
    }
    async deleteNotification(ctx){
       const data = ctx.request.all()
      const validation = await this.NotificationValidation.validateNotificationData(data)
      if (validation.fails()) {
        return ctx.response.status(401).send({message: 'Invalid data sent'})
      }
       return await this.notificationQuery.deleteNotification(data.id, ctx.auth.user.id)
    }
    // comment notification


  
   
    




}

module.exports = NotificationService
