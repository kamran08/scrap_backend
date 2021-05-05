'use strict'
const FeedService = use('./FeedService')
const Feed = use('App/Models/Feed')
 

class FeedController {
    constructor(){
        this.FeedService = new FeedService() 
    }
    
    async createFeed(ctx){
        return this.FeedService.createFeed(ctx)
    }
    
    async uploadImages(ctx){
        return this.FeedService.uploadImage(ctx)
    }
    
    async getFeed(ctx){
     return this.FeedService.getFeed(ctx)
    }
    
    
}


module.exports = FeedController