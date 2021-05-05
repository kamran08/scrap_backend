'use strict'

const { validate, rule } = use('Validator')

class AuthValidation {
    registerRules(){
        return {
            firstName: 'required|string|max:255',
            lastName: 'required|string|max:255',
            email: 'required|string|max:255|email|unique:users',
            password: 'required|string|min:6',
            // gender: 'required|string',
      }
    }
    
    messages () {
        return {
            'firstName.required' : 'Firstname is required',
            'lastName.required' : 'Lastname is required',
            // 'gender.required' : 'Gender is required',
            'email.required' : 'Email is required',
            'email.unique':'This email already in use. Choose a different one.',
            'password.required' : 'Password is required',
            'password.minLength' : 'Password must be at least 6 characters long',
            'password_confirmation.confirmed':'The password confirmation doesn`t match.',
        }
      }
    
    async validateRegisterData (data) {
        return validate(data, this.registerRules(), this.messages())
      }
      
    // loginRules(){
    //     return {
    //       // email: 'required|email|exists:users,email',
    //       email: 'required|email',
    //       password: 'required|min:6',
    //   }
    // }
    
    // loginMessages () {
    //     return {
    //         'email.required' : 'Email is required',
    //         'email.exists':'Email doesn`t exists.',
    //         'password.required' : 'Password is required',
    //         'password.minLength' : 'Password must be at least 6 characters long',
    //     }
    //   }
    
    // async validateLoginData (data) {
    //     return validate(data, this.loginRules(), this.loginMessages())
    //   }
    verificationRules(){
        return {
          verificationCode: 'required|string|max:6'
      }
    }
    
    verificationMessages () {
        return {
          'verificationCode.required':'Code is required'
        }
      }
    
    async validateVerificationData (data) {
        return validate(data, this.verificationRules(), this.verificationMessages())
      }
      
       //Reset-Password
    passwordResetVerificationRules(){
        return {
          email: 'required|email|exists:users,email'
      }
    }
    
    passwordResetVerificationMessages () {
        return {
          'email.required':'Email is required',
          'email.exists':'We cannot find user with provided email',
        }
      }
    
    async validatePasswordResetData (data) {
        return validate(data, this.passwordResetVerificationRules(), this.passwordResetVerificationMessages())
      }
      
      
    verifyPasswordResetRules(){
        return {
          verificationCode: 'required|string|max:6'
      }
    }
    
    verifyPasswordResetMessages () {
        return {
          'verificationCode.required':'Code is required',
        }
      }
    
    async validateResetPasswordData (data) {
        return validate(data, this.verifyPasswordResetRules(), this.verifyPasswordResetMessages())
      }
      
      
    newPasswordRules(){
        return {
          password: 'required|min:6',
          email: 'required',
      }
    }
    
    newPasswordMessages () {
        return {
          'password.required':'Password is required'
        }
      }
    
    async validateNewPasswordData (data) {
        return validate(data, this.newPasswordRules(), this.newPasswordMessages())
      }
      
      
      
      
      
    
    socialRules(){
        return {
          facebook: [validations.url()],
          twitter: [validations.url()],
          youtube: [validations.url()],
          github: [validations.url()],
      }
    }
    
    socialMessages () { 
        return {
            // 'email.required' : 'Email is required',
            // 'email.exists':'Email doesn`t exists.',
            // 'password.required' : 'Password is required',
            // 'password.minLength' : 'Password must be at least 6 characters long',
        }
      }
    
    async validateSocialData (data) {
        return validate(data, this.socialRules(), this.socialMessages())
      }

    
    
    
    
    
    
    
    
    
    
    
}
 

module.exports = AuthValidation