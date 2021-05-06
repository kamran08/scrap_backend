const Feed = use('App/Models/Feed')

class FeedQuery { 
    createFeed(feed){
        return Feed.create(feed)
     } 
    updateFeed(feed){
        return Feed.query().where('id', feed.id).update(feed)
     } 
    
    getFeed(){
        return Feed.query().with('user').orderBy('id', 'desc').withCount('comment').withCount('likes').with('hasUserLike').fetch()
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
     
    
 }
 
 
 module.exports = FeedQuery
 
 