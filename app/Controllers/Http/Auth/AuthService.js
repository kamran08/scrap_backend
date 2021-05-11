'use strict'
const AuthValidator = use('./AuthValidation')
const AuthQuery = use('./AuthQuery')
const Mail = use('Mail')
const moment = require('moment')
const User = use('App/Models/User')
const Hash = use('Hash')

class AuthService {
    
    constructor(){
      this.authValidator = new AuthValidator()
      this.authQuery = new AuthQuery()
    }
    
    async createUser(data,response, auth){
        const validation = await this.authValidator.validateRegisterData(data)
        
        if (validation.fails()) {
          return response.status(401).send(validation.messages())
        }
        
        let username = data.firstName +'_'+data.lastName
        let totalUsers = await this.authQuery.countUserFieldByKey('username', username)
        let newCount = totalUsers > 0 ? ++totalUsers : ''
        if(newCount > 0){
            username = username+'_'+ newCount
        }
        
        let number =Math.floor(Math.random() * 899999 + 100000)
        const user =  await this.authQuery.createUser({
            firstName : data.firstName,
            lastName : data.lastName,
            password: data.password,
            email : data.email,
            token: number,
            token_created_at: new Date(),
            username : username,
            is_agree : true,
        })
        
        await Mail.send('emails.verify_email', user.toJSON(), (message) => {
          message.from('noreply@scrapabill.com')
          message.to(user.email)
          message.subject('Please confirm your varification code')
        })

        // await auth.login(user)
        // return user

    }
    
    async login(data, response, auth){
      return await auth.query(function (query) {query.where('is_active', true)}).attempt(data.email, data.password)

    }
    
    // async verifyUserEmail(ctx){
    //   let data = ctx.request.all()
    //   const validation = await this.authValidator.validateVerificationData(data)
      
    //   if (validation.fails()) {
    //     return ctx.response.status(401).send(validation.messages())
    //   }
      
    //   const code = await User.findBy('token',data.verificationCode)
    //   if(!code){
    //     return ctx.response.status(406).send({message:'Verification code is wrong.'})
    //   }
    //   const user =  await this.authQuery.updateUserInfo('id', code.id,{
    //       token : null,
    //       token_created_at : null,
    //       is_active : true,
    //   })
      

    //   await auth.login(code)
    //   return code

    // }
    
    async verifyUserEmail(data, response, auth){
      // let data = request.all()
      const validation = await this.authValidator.validateVerificationData(data)
      
      if (validation.fails()) {
        return response.status(401).send(validation.messages())
      }
      
      const code = await User.findBy('token',data.verificationCode)
      if(!code){
        return response.status(406).send({message:'Verification code is wrong.'})
      }
      const user =  await this.authQuery.updateUserInfo('id', code.id,{
          token : null,
          token_created_at : null,
          is_active : true,
      })
      

      await auth.login(code)
      return code

    }
    
    
    //Reset-Password
    async verifyResetPassword(data,response, auth){
      const validation = await this.authValidator.validatePasswordResetData(data)
      
      if (validation.fails()) {
        return response.status(401).send(validation.messages())
      }
      
      // const code = await User.findBy('token',data.verificationCode)
        
      const userInfo = await User.findBy('email', data.email)

      // generating number
      let number =Math.floor(Math.random() * 899999 + 100000)
      
      const user =  await this.authQuery.updateUserInfo('id', userInfo.id,{
          token : number,
          token_created_at : new Date()
      })
      const userInfo2 = await User.findBy('email', data.email)

      await Mail.send('emails.verify_email', userInfo2.toJSON(), (message) => {
        message.from('noreply@scrapabill.com')
        message.to(userInfo2.email)
        message.subject('Please confirm your email address')
      })
      
      return user

    }
    
  
    async verifyResetPasswordCode(data,response, auth){ 
      const validation = await this.authValidator.validateResetPasswordData(data)
      
      if (validation.fails()) {
        return response.status(401).send(validation.messages())
      }
      console.log(data.email)
      const user =  await this.authQuery.getUserInfo('email', data.email)
      
      if(user.token == data.verificationCode){
       return 'success'
      }else{
        return response.status(404).json('Invalide code')
      }
      
      
      
      // const code = await User.findBy('token',data.verificationCode)
        
      // const userInfo = await User.query().where('token', data.verificationCode).first()
      // return userInfo
      // if(userInfo){
        // return response.json('code verified') 
      // }

    }
    
    
        //Reset-old-Password
    async resetOldPassword(data,response, auth){
          const validation = await this.authValidator.validateNewPasswordData(data)
          
          if (validation.fails()) {
            return response.status(401).send(validation.messages())
          }
          
            
          const userInfo = await User.findBy('email', data.email)
    
          // code check expired
          const tokenExpired = moment().subtract(2, 'days').isAfter(userInfo.token_created_at)
    
            if (tokenExpired) {
              return response.status(406).json('token expired') 
            }
          
          await this.authQuery.updateUserInfo('id', userInfo.id,{
              password : await Hash.make(data.password),
              token : null,
              token_created_at : null
          })
          
          return await auth.login(userInfo)
          
    
    
    }
    
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  


}

module.exports = AuthService
