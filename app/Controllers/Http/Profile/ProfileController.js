'use strict'
const ProfileService = use('./ProfileService')
 

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
        return this.profileService.verifyNewPasswordCode(request.all(), response, auth)
    }
    async uploadImages(ctx){
        return this.profileService.uploadImage(ctx)
    }
    
    
    
    
    
}

module.exports = ProfileController
