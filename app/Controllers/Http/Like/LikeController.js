'use strict'
const LikeService = use('./LikeService')

class LikeController {

  constructor(){
      this.likeService = new LikeService()
  }

  async createLike(ctx){
      return this.likeService.createLike(ctx)
  }
  async createCommentLike(ctx){
      return this.likeService.createCommentLike(ctx)
  }
  async createReplyLike(ctx){
      return this.likeService.createReplyLike(ctx)
  }
  async hello(ctx){
      return "hello"
      return this.likeService.createLike(ctx)
  }




}


module.exports = LikeController
