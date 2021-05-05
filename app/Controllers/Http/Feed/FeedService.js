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
      for(let d of feed){
          d.comments =[]
          d.isOpen = false
          
      }
        
      return feed
        
    }
      
    async createFeed(ctx){
      let data = ctx.request.all()
      const validation = await this.FeedValidator.validateCreateFeed(data)
      
      if (validation.fails()) {
        return ctx.response.status(401).send(validation.messages())
      }
        const feed =  await this.FeedQuery.createFeed({
          user_id : ctx.auth.user.id,
          images : data.images,
          feedTxt: data.feedTxt,
          metaData : data.metaData,
          type: data.type
        })
        
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
      
      
      
      
      
      
      
}


module.exports = FeedService