'use strict'
const ReplyService = use('./ReplyService')

class ReplyController {
    constructor(){
        this.ReplyService = new ReplyService() 
    }
    
    async createReply(ctx){
        return this.ReplyService.createReply(ctx)
    }
    
    async getReply(ctx){
        return this.ReplyService.getReply(ctx)
    }
    
    async deleteReply(ctx){
        return this.ReplyService.deleteReply(ctx)
    }
    
    async editReply(ctx){
        return this.ReplyService.editReply(ctx)
    }
    

    
}

module.exports = ReplyController
