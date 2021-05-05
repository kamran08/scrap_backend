'use strict'
const User = use('App/Models/User')
const Feed = use('App/Models/Feed')
const { validate, rule } = use('Validator')
const Mail = use('Mail')
const moment = require('moment')
const Hash = use('Hash')
// const Twilio = use('Twilio');
// const env = use('Env')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const Helpers = use('Helpers')
const Env = use('Env')
const fs = require('fs')


class UserController {
  
   async user({request, response, params, auth}){
       try {
          const user = await auth.loginViaId(34)

       } catch (error) {
          return error
       }

   }

  async getUser({request, response, params, auth}){
      try {
        const user = await auth.getUser()
        console.log('cookie is.. haha', request.headers())

        return user
      } catch (error) {
          //console.log('error is', error)
          return 
      }

  }
  async logout({request, response, params, auth}){
      await auth.logout()
      return 'logged out'
  }
  
  async verify_email ({request, response, auth }) {
    let reqData = request.input('token')
    // return console.log(reqData)
    const rules = {
      token: 'required|string|max:6'
      }
      const messages = {
          'token.required':'Token is required'
      }
      const validation = await validate(reqData, rules, messages)
      
      if (validation.fails()) {
        return response.status(401).json(validation.messages())
    }
    // get user with the cinfirmation token
    const user = await User.findBy('token',reqData)

    // set confirmation to null and is_active to true
    if(user){
    user.token = null
    user.token_created_at = null
    user.is_active = true

    await user.save()
    
    await auth.login(user)
    
     return user;
    }

 
  }
  
  
  async login({ request, response, auth }){
    const { email, password } = request.all()
    // let user = await auth.attempt(email, password) 
    const data = auth.query(function (query) {query.where('is_active', true)}).attempt(email, password)
    return data;
  }
  
  async sendResetLink ({ request, session, response }) {
    // account request password recovery
    let email = request.input('email')
    
    const rules = {
      email: 'required|email|exists:users,email'
      }
      const messages = {
          'email.required':'Email is required',
          'email.exists':'We cannot find user with provided email',
      }
      const validation = await validate(email, rules, messages)
      
      if (validation.fails()) {
        return response.status(401).json(validation.messages())
    }
    
    
    try {

      // checking if email is registered
      const user = await User.findByOrFail('email', email)

      // generating number
      let number =Math.floor(Math.random() * 899999 + 100000)

      // registering when token was created and saving token
      user.token_created_at = new Date()
      user.token = number
      user.is_active = false

      // persisting data (saving)
      await user.save()

      await Mail.send('emails.verify_email', user.toJSON(), (message) => {
        message.from('foo@bar.com')
        message.to(user.email)
        message.subject('Please confirm your email address')
      })
      
      
     
      // return user
      
     } catch (error) {
      return error
      }

     
    }
    
    async verify_code ({request, response, auth }) {
      let reqData = request.input('token')
      // return console.log(reqData)
      const rules = {
        token: 'required|string|min:6'
        }
        const messages = {
            'token.required':'Token is required'
        }
        const validation = await validate(reqData, rules, messages)
        
        if (validation.fails()) {
          return response.status(401).json(validation.messages())
      }
      // get user with the cinfirmation token
      const user = await User.findByOrFail('token',reqData)
  
      // set confirmation to null and is_active to true
      if(user){
      
        return response.status(200).json('code verified') 
      }
  
   
    }
    
    
    async passwordReset ({ request, response, auth}) {
      let password = request.input('password')
      // return console.log(reqData)
      const rules = {
        password: 'required|min:6'
        }
        const messages = {
            'password.required':'Password is required'
        }
        const validation = await validate(password, rules, messages)
        
        if (validation.fails()) {
          return response.status(401).json(validation.messages())
      }
      
      
     
      let email = request.input('email') // email requesting recovery
  
      // let  newPassword  = request.input('password')
  
      // looking for user with the registered email
      const user = await User.findBy('email', email)
  
      // checking if token is still the same
      // just to make sure that the user is not using an old link
      // after requesting the password recovery again
      // const sameToken = tokenProvided === user.token
  
      // if (!sameToken) {
      //         // display error message
      //         session.flash({
      //           notification: {
      //             type: 'danger',
      //             message: 'This password reset token does not exist.'
      //           }
      //         })
      
      //         return response.redirect('back')
      // }
  
      // checking if token is still valid (48 hour period)
      const tokenExpired = moment()
        .subtract(2, 'days')
        .isAfter(user.token_created_at)
  
      if (tokenExpired) {
        return response.status(401).json('token expired') 
      }
   
      // saving new password
      // user.password =await Hash.make(password)
      user.password =password
  
      // deleting current token
      user.token = null
      user.token_created_at = null
      user.is_active = true
      await user.save()
      // const data = await User.query().where('email',email).update({
      //   password: password,
      //   token: null,
      //   token_created_at: null,
      //   is_active: true,
      // })
      
    //  return user
     return await auth.login(user)
      // return response.redirect('/login')
    }
    

    
    async updateSocialLink ({ request, session, response, auth }) {
      const reqData = request.all()
      
      try {
        
      const user =  User.query().where('id', auth.user.id).update({
              facebook : reqData.facebook,
              twitter : reqData.twitter,
              youtube : reqData.youtube,
              linkedin : reqData.linkedin,
              instagram : reqData.instagram,
      })
  
        // await user.save()
      return user
        
       } catch (error) {
        return error
        }
  
       
    }
      
      
      
      
    async emailUpdate ({ request, session, response, auth }) {
        // account request password recovery
          let newEmail = request.input('newEmail')
          
          
        const rules = {
          newEmail: 'required|string|max:255|email|unique:users,email'
          }
          const messages = {
              'newEmail.unique':'This email is already in use .'
          }
          const validation = await validate(newEmail, rules, messages)
          
          if (validation.fails()) {
            return response.status(401).json(validation.messages())
        }
        
        
        try {
          const user = await User.findByOrFail('email', auth.user.email)
    
          // generating number
          let number =Math.floor(Math.random() * 899999 + 100000)
    
          // registering when token was created and saving token
          user.token_created_at = new Date()
          user.token = number
          await user.save()
    
          await Mail.send('emails.verify_email', user.toJSON(), (message) => {
            message.from('foo@bar.com')
            message.to(newEmail)
            message.subject('Please confirm your email address')
          })
          
        //   const sendSms = async () => {
        //     const message = await Twilio.messages.create({
        //         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        //         from: '88001739190430',
        //         to: '88001922060350'
        //     });
        
        //   console.log(message.sid);
        // }
        
      // const sms = await client.messages
      //     .create({
      //       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      //       from: '+88001739190430',
      //       mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
      //       to: '+88001922060350'
      //     })
          // return sms
          // const sendemail = await client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          // .verifications
          // .create({channelConfiguration: {
          //    template_id: 'd-4f7abxxxxxxxxxxxx',
          //    from: 'override@example.com',
          //    from_name: 'Override Name'
          //  }, to: 'subhesadek89990@gmail.com', channel: 'email'})
          // .then(verification => console.log(verification.sid));
          
          // return sendemail
        
        console.log('testing-2')
          
          
         
          return newEmail
          
         } catch (error) {
          return error
          }
    
         
    }
  
     
    async verifyEmailUpdate ({request, response, auth }) {
          let reqData = request.all()
          // return console.log(reqData)
          const rules = {
            token: 'required|string|max:6'
            }
            const messages = {
                'token.required':'Token is required'
            }
            const validation = await validate(reqData.token, rules, messages)
            
            if (validation.fails()) {
              return response.status(401).json(validation.messages())
          }
          // get user with the cinfirmation token
          const user = await User.findBy('email',auth.user.email)
      
          // set confirmation to null and is_active to true
          if(user){
          user.token = null
          user.token_created_at = null
          user.email = reqData.email
      
          await user.save()
          
           return user;
           
          }
      
       
    }
  
    async changePassword ({request, response, auth }) {
          let reqData = request.all()
          // return console.log(reqData)
          const rules = {
            newPassword: 'required|string|min:6'
            }
            const messages = {
                'newPassword.required':'Password is required'
            }
            const validation = await validate(reqData.newPassword, rules, messages)
            
            if (validation.fails()) {
              return response.status(401).json(validation.messages())
          }
          
          // get user with the cinfirmation token
          const user = await User.findBy('email',auth.user.email)
          const check = await Hash.verify(reqData.currentPassword, user.password)
          if (check){
              // generating number
              let number =Math.floor(Math.random() * 899999 + 100000)
        
              // registering when token was created and saving token
              user.token_created_at = new Date()
              user.token = number
              await user.save()
              
                await Mail.send('emails.verify_email', user.toJSON(), (message) => {
                  message.from('foo@bar.com')
                  message.to(user.email)
                  message.subject('Please confirm your email address')
                })
                return reqData.newPassword
          }else{
            return response.status(406).json('password doesn`t match')
          }
      
       
    }
    
         
    async verifyChangePassword ({request, response, auth }) {
      let reqData = request.all()
      console.log(reqData)
      // return console.log(reqData)
      const rules = {
        code: 'required|string|max:6'
        }
        const messages = {
            'code.required':'Verification code is required'
        }
        const validation = await validate(reqData.code, rules, messages)
        
        if (validation.fails()) {
          return response.status(401).json(validation.messages())
      }
      // get user with the cinfirmation token
      const user = await User.findBy('email',auth.user.email)
      
      // set confirmation to null and is_active to true
      if(user.token === reqData.code){
        user.password = reqData.password
        user.token = null
        user.token_created_at = null
  
      await user.save()
       return user;
       
      }else{
        return response.status(406).json('invalid')
      }
  
   
    }
    
    
      
  async createpost({ request, response, auth }) {  
    const reqData = request.all()
    const feed = new Feed()
    feed.user_id=auth.user.id
    feed.images=reqData.images
    feed.feedTxt=reqData.feedTxt
    feed.metaData=reqData.metaData
    feed.type=reqData.type
    
    
    await feed.save()

    return response.status(201).json(feed) 
  }

  
  async upload({request,response}){
    // console.log('hello world')
    const photo = request.file('file')
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

module.exports = UserController
