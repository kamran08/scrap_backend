const Feed = use('App/Models/Feed')

class FeedQuery { 
    createFeed(feed){
        return Feed.create(feed)
     } 
    
    getFeed(){
        return Feed.query().with('user').orderBy('id', 'desc').withCount('comment').withCount('likes').with('hasUserLike').fetch()
     } 
    
 }
 
 
 module.exports = FeedQuery
 
 