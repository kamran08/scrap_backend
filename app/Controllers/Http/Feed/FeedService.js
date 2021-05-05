'use strict'
const FeedValidator = use('./FeedValidation')
const FeedQuery = use('./FeedQuery')

const Feed = use('App/Models/Feed')
const Helpers = use('Helpers')
const Env = use('Env')

class FeedService {
  
    constructor(){
      this.FeedValidator = new FeedValidator()
      this.FeedQuery = new FeedQuery()
    }
      
    async getFeed(ctx){
      let feed = await this.FeedQuery.getFeed()
      feed = feed.toJSON()
      // let feed = await this.FeedQuery.getSingleFeed(feed1.id)
      for(let d of feed){
          d.comments =[]
          d.isOpen = false
          d.isEdit = false
          
      }
        
      return feed
        
    }
      
    async createFeed(ctx){
      let data = ctx.request.all()
      const validation = await this.FeedValidator.validateCreateFeed(data)
      
      if (validation.fails()) {
        return ctx.response.status(401).send(validation.messages())
      }
        const feed1 =  await this.FeedQuery.createFeed({
          user_id : ctx.auth.user.id,
          images : data.images,
          feedTxt: data.feedTxt,
          metaData : data.metaData,
          type: data.type
        })
        
        let feed = await this.FeedQuery.getSingleFeed(feed1.id)
          feed.comments =[]
          feed.isOpen = false
        return ctx.response.status(201).json(feed)
        
    }
      
    async uploadImage(ctx){
      let data = ctx.request.all()
      
      // const photo = ctx.file
      const photo = ctx.request.file('file')
      // console.log(photo,"my-photo")
      const name = new Date().getTime() +'.'+photo.subtype
      // const name = new Date().getTime()+'habijabi'
      await photo.move(Helpers.publicPath('uploads'), {
          name:name,
          overwrite: true
      
        })
        let siteUrl = Env.get('APP_URL')
        let upFile = `${siteUrl}/uploads/${name}`
        return upFile
        
    }
    
    async deleteFeed(ctx){
      let data =ctx.request.all()
      const validation = await this.FeedValidator.validateDeleteFeed(data)
      
      if (validation.fails()) {
        return ctx.response.status(401).send(validation.messages())
      }
      
        let deleteFeed = await this.FeedQuery.deleteFeed('id', data.feed_id, 'user_id', ctx.auth.user.id)
        return deleteFeed
    }
    
    async editFeed(ctx){
      let data =ctx.request.all()
      const validation = await this.FeedValidator.validateEditFeed(data)
    
      if (validation.fails()) {
        return ctx.response.status(401).send(validation.messages())
      }
      
        let editFeed = await this.FeedQuery.editFeed('id', data.feed_id, 'user_id', data.user_id,{
          feedTxt: data.feedTxt
        })
        
        return editFeed
        
    }
    
    async getGalryImages(ctx){
      
      if (!ctx.auth.user || !ctx.auth.user.id) {
        return ctx.response.status(401).send({message: 'Your are not a authenticate user!'})
      }
      let alldata = []
      let images =await  this.FeedQuery.getGalryImages('user_id',ctx.auth.user.id)
      images = images.toJSON()
       for(let d of images){
          d.images = JSON.parse(d.images)
          alldata =  alldata.concat(d.images);
        }
        // d.images = JSON.parse(d.images)"
       
       return alldata
   }
      
      
      
      
      
      
      
}


module.exports = FeedService