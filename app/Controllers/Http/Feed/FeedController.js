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
    async updateFeed(ctx){
        return this.FeedService.updateFeed(ctx)
    }
    
    async uploadImages(ctx){
        return this.FeedService.uploadImage(ctx)
    }
    
    async getFeed(ctx){
     return this.FeedService.getFeed(ctx)
    }
    async getFeed1(ctx){
     return this.FeedService.getFeed1(ctx)
    }
    
    async deleteFeed(ctx){
        return this.FeedService.deleteFeed(ctx)
    }
    
    async editFeed(ctx){
        return this.FeedService.editFeed(ctx)
    }
    
    async getGalryImages(ctx){
        return this.FeedService.getGalryImages(ctx)
    }
    
    
}


module.exports = FeedController