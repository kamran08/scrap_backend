'use strict'
const Notification = use('App/Models/Notification')
class NotificationQuery{
  async getNotification(uid){
    return Notification.query().where('to', uid).fetch()
  }
  async createNotification(notificationData){
    return Notification.create(notificationData)
  }
  async deleteNotification(id,to){
    return Notification.query().where('id', id).where('to', to).delete()
  }

}


module.exports = NotificationQuery
