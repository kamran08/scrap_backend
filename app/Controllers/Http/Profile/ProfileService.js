'use strict'
const ProfileValidator = use('./ProfileValidation')
const ProfileQuery = use('./ProfileQuery')
const Mail = use('Mail')
const moment = require('moment') 
const sgMail = require('@sendgrid/mail')
const User = use('App/Models/User')
const Hash = use('Hash')
const Helpers = use('Helpers')
const Env = use('Env')

class ProfileService {
    constructor(){
        this.profileValidator = new ProfileValidator()
        this.ProfileQuery = new ProfileQuery()
      }
    
    
      
   async getBasicInfo(ctx){
     
      const user = await this.ProfileQuery.getUserInfo('id', ctx.auth.user.id, 'id', 'firstName', 'lastName','country','birthDate','gender','profilePic')
       
       return user
   }
          
      
   async updateBasicInfo(data,response, auth){
        const validation = await this.profileValidator.validateBasicInfo(data)
            
        if (validation.fails()) {
        return response.status(401).send(validation.messages())
        }
        
      let username = data.firstName +'_'+data.lastName
      let totalUsers = await this.ProfileQuery.countUserFieldByKey('username', username)
      let newCount = totalUsers > 0 ? ++totalUsers : ''
      if(newCount > 0){
          username = username+'_'+ newCount
      }
       
      const user = await this.ProfileQuery.updateUserInfo('id', auth.user.id,{
           firstName : data.firstName,
           lastName : data.lastName,
           username : username.toLowerCase(),
           country : data.country,
           profilePic : data.profilePic,
           birthDate : data.birthDate,
           gender : data.gender,
       })
       
       return data
   }
          
      
   async updateSocialLink(data,response, auth){
       
    //    const userInfo = await User.findBy('email', data.email)
       
      const user = await this.ProfileQuery.updateUserInfo('id', auth.user.id,{
           facebook : data.facebook,
           twitter : data.twitter,
           youtube : data.youtube,
           linkedin : data.linkedin,
           instagram : data.instagram,
       })
       
       return user
   }
          
   async updatePhone(data,response, auth){
       
    //    const userInfo = await User.findBy('email', data.email)
       
      const user = await this.ProfileQuery.updateUserInfo('id', auth.user.id,{
           phone : data.phone
       })
       
       return user
   }
          
   async updateEmail(data,response, auth){
        const validation = await this.profileValidator.validateEmailUpdateData(data)
        
        if (validation.fails()) {
        return response.status(401).send(validation.messages())
        }
        
        const userInfo = await User.findByOrFail('email', auth.user.email)
        
       // generating number
       let number =Math.floor(Math.random() * 899999 + 100000)
       
       await this.ProfileQuery.updateUserInfo('id', auth.user.id,{
           token : number,
           token_created_at : new Date()
       })
       
      //  await Mail.send('emails.verify_email', userInfo.toJSON(), (message) => {
      //   message.from('foo@bar.com')
      //   message.to(data.newEmail)
      //   message.subject('Please confirm your email address')
      // })
     // start
        await Mail.send(
          'emails.verify_email',
          userInfo.toJSON(),
          (message) => {
            message
              // .to('sa1021757@gmail.com')
               message.to(userInfo.email)
              .from('foo@bar.com')
              .subject('Please confirm your email address');
          }
        );
        //end
       
       return data.newEmail
   }
          
          
   async verifyNewEmail(data,response, auth){
        const validation = await this.profileValidator.validateEmailCodeData(data)
        
        if (validation.fails()) {
        return response.status(401).send(validation.messages())
        }
        
        
        
    
       const user =  await this.ProfileQuery.updateUserInfo('id', auth.user.id,{
           token : null,
           token_created_at : null,
           email : data.email,
       })
       
       const userInfo = await User.findBy('email', data.email)
       
       return userInfo
   }
          
          
   async changePassword(data,response, auth){
        const validation = await this.profileValidator.validateNewPasswordData(data)
        
        if (validation.fails()) {
        return response.status(401).send(validation.messages())
        }
        
        
        
        const userInfo = await User.findBy('email',auth.user.email)
        
        const check = await Hash.verify(data.currentPassword, userInfo.password)
        if (check){
            // generating number
            let number =Math.floor(Math.random() * 899999 + 100000)
            
                
            const user =  await this.ProfileQuery.updateUserInfo('id', userInfo.id,{
                token : number,
                token_created_at : new Date()
            })
            // registering when token was created and saving token
            // user.token_created_at = new Date()
            // user.token = number
            // await user.save()
            
              await Mail.send('emails.verify_email', userInfo.toJSON(), (message) => {
                message.from('foo@bar.com')
                message.to(userInfo.email)
                message.subject('Please confirm your email address')
              })
              
              return data.newPassword
        }else{
            
          return response.status(406).json('password doesn`t match')
        }
   }
          
          
          
   async verifyNewPasswordCode(data,response, auth){
        const validation = await this.profileValidator.validateNewPasswordCode(data)
        
        if (validation.fails()) {
        return response.status(401).send(validation.messages())
        }
        
      // get user with the cinfirmation token
      const userInfo = await User.findBy('email',auth.user.email)
      
      // set confirmation to null and is_active to true
      if(userInfo.token === data.code){
        const user =  await this.ProfileQuery.updateUserInfo('id', userInfo.id,{
            token : null,
            token_created_at : null,
            password : await Hash.make(data.password),
            
        })
        
       return user;
       
      }else{
        return response.status(406).json('invalid')
      }
      
   }
   
   async uploadImage(ctx){
    let data = ctx.request.all()
    
    // const photo = ctx.file
    const photo = ctx.request.file('file')
    // console.log(photo,"my-photo")
    const name = new Date().getTime() +'.'+photo.subtype
    // const name = new Date().getTime()+'habijabi'
    await photo.move(Helpers.publicPath('uploads/profilePic'), {
        name:name,
        overwrite: true
    
      })
      let siteUrl = Env.get('APP_URL')
      let upFile = `${siteUrl}/uploads/profilePic/${name}`
      
      // const userInfo = await User.findBy('email',ctx.auth.user.email)
    //   const user =  await this.ProfileQuery.updateUserInfo('id', ctx.auth.user.id,{
    //     profilePic : upFile
        
    // })
      return upFile
      
  }
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
}

module.exports = ProfileService
