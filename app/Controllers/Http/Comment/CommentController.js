'use strict'
const CommentService = use('./CommentService')

class CommentController {
    constructor(){
        this.CommentService = new CommentService() 
    }
    
    async createComment(ctx){
        return this.CommentService.createComment(ctx)
    }
    
    async getComment(ctx){
        return this.CommentService.getComment(ctx)
    }
    
    async deleteComment(ctx){
        return this.CommentService.deleteComment(ctx)
    }
    
    async editComment(ctx){
        return this.CommentService.editComment(ctx)
    }
    
}

module.exports = CommentController
