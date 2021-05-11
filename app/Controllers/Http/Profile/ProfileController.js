'use strict'
const ProfileService = use('./ProfileService')
const Hash = use('Hash')

class ProfileController {
    constructor(){
        this.profileService = new ProfileService() 
    }
    
    async getUser(ctx){
        return this.profileService.getBasicInfo(ctx)
    }
    
    async updateBasicInfo({request, response, auth}){
        return this.profileService.updateBasicInfo(request.all(), response, auth)
    }
    
    async updateSocialLink({request, response, auth}){
        return this.profileService.updateSocialLink(request.all(), response, auth)
    }
    
    async updatePhone({request, response, auth}){
        return this.profileService.updatePhone(request.all(), response, auth)
    }
    
    async emailUpdate({request, response, auth}){
        return this.profileService.updateEmail(request.all(), response, auth)
    }
    
    async verifyEmailUpdate({request, response, auth}){
        return this.profileService.verifyNewEmail(request.all(), response, auth)
    }
    
    async changePassword({request, response, auth}){
        return this.profileService.changePassword(request.all(), response, auth)
    }
    
    async verifyChangePasswordCode({request, response, auth}){
        let data = request.all()
        data.password = await Hash.make(data.password)
        return this.profileService.verifyNewPasswordCode(data, response, auth)
    }
    async uploadImages(ctx){
        return this.profileService.uploadImage(ctx)
    }
    
    
    
    
    
}

module.exports = ProfileController
