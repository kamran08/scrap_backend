'use strict'
// import AuthQuery from './AuthQuery'
// import AuthValidation from './AuthValidation'

// const AuthQuery = new AuthQuery
// const authRules = new AuthValidation
const AuthService = use('./AuthService')

class AuthController { 
    constructor(){
        this.authService = new AuthService() 
    }
     
    async registerUser({request, response, auth}){
        return this.authService.createUser(request.all(), response, auth)
  
    }
    
    async login({request, response, auth}){
        return this.authService.login(request.all(), response, auth)
    }
    
    // async verifyRegEmail(ctx){
    //     return this.authService.verifyUserEmail(ctx)
    // }
    
    async verifyRegEmail({request, response, auth}){
        return this.authService.verifyUserEmail(request.all(), response, auth)
    }
    
    async sendResetLink({request, response, auth}){
        return this.authService.verifyResetPassword(request.all(), response, auth)
    }
    
    async verifyPasswordResetCode({request, response, auth}){
        return this.authService.verifyResetPasswordCode(request.all(), response, auth)
    }
    
    async passwordReset({request, response, auth}){
        return this.authService.resetOldPassword(request.all(), response, auth)
    }
    
    // async getUser({auth}){
    //     try {
    //       const user = await auth.getUser()
    //       // console.log('cookie is.. haha', request.headers())
  
    //       return user
    //     } catch (error) {
    //         //console.log('error is', error)
    //         return 'not logged in ... '
    //     }
  
    // }
      
    async logout({auth}){
       return await auth.logout()
        
    }
    
    
    
    
    
    
    
    
    
    
} 

module.exports = AuthController
