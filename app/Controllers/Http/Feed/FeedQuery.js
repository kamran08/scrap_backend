const Feed = use('App/Models/Feed')
const User = use('App/Models/User')

class FeedQuery { 
    createFeed(feed){
        return Feed.create(feed)
     } 
    updateFeed(feed){
        return Feed.query().where('id', feed.id).update(feed)
     } 
    
    getFeed1(ctx){
        return Feed.query().with('user').orderBy('id', 'desc').withCount('comment').withCount('likes').with('hasUserLike').fetch()
     }
    getFeed(ctx){
       let data = ctx.request.all()
       if(data.user_id &&data.user_id!=0){
          return Feed.query().with('user').where('user_id', data.user_id).orderBy('id', 'desc').withCount('comment').withCount('likes').with('hasUserLike').fetch()
       }
        return Feed.query().with('user').where('user_id', ctx.auth.user.id).orderBy('id', 'desc').withCount('comment').withCount('likes').with('hasUserLike').fetch()
     }
     
     getSingleFeed(id){
        return Feed.query().with('user').where('id', id).withCount('comment').withCount('likes').with('hasUserLike').first()
     }
     
     async deleteFeed(column, vlaue, userColumn, userValue){
        return Feed.query().where(column, vlaue).where(userColumn, userValue).delete()
     }
     
     async editFeed(column, vlaue, userColumn, userValue, feed){
        return Feed.query().where(column, vlaue).where(userColumn, userValue).update(feed)
     }
     
     getGalryImages(column,value){
        
        return  Feed.query().where('user_id', value).select('images').fetch()
       
     }
     getFeedUser(ctx){
        let data = ctx.request.all()
        if(data.user_id!=0) return  User.query().where('id', data.user_id).first()
        else return User.query().where('id', ctx.auth.user.id).first()
       
     }
     updateView(ctx,views){
        let data = ctx.request.all()
        if(data.user_id!=0 && data.user_id!=ctx.auth.user.id)
        return  User.query().where('id', data.user_id).update({view:views+1})
        return 0
       
       
     }
     
    
 }
 
 
 module.exports = FeedQuery
 
 