'use strict' 

const { validate, rule } = use('Validator')

class ProfileValidation {
    
    emailUpdateRules(){
        return {
            newEmail: 'required|string|max:255|email|unique:users,email'
      }
    }
    
    emailUpdateMessages () {
        return {
            'newEmail.unique':'This email is already in use .',
            'newEmail.max':'The email must not be greater than 255 charecters.',
        }
      }
    
    async validateEmailUpdateData (data) {
        return validate(data, this.emailUpdateRules(), this.emailUpdateMessages())
    }
    
    
    verifyEmailUpdateRules(){
        return {
            token: 'required|string|max:6'
      }
    }
    
    verifyEmailUpdateMessages () {
        return {
            'token.required':'Token is required'
        }
      }
    
    async validateEmailCodeData (data) {
        return validate(data, this.verifyEmailUpdateRules(), this.verifyEmailUpdateMessages())
    }
    
    
    newPasswordRules(){
        return {
            newPassword: 'required|string|min:6'
      }
    }
    
    newPasswordMessages () {
        return {
            'newPassword.required':'Password is required'
        }
      }
    
    async validateNewPasswordData (data) {
        return validate(data, this.newPasswordRules(), this.newPasswordMessages())
    }
    
    
    verifyNewPasswordCodeRules(){
        return {
            code: 'required|string|max:6'
      }
    }
    
    verifyNewPasswordCodeMessages () {
        return {
            'code.required':'Verification code is required'
        }
      }
    
    async validateNewPasswordCode (data) {
        return validate(data, this.verifyNewPasswordCodeRules(), this.verifyNewPasswordCodeMessages())
    }
    
    
    basicInfoRules(){
        return {
            firstName: 'required|string|max:255',
            lastName: 'required|string|max:255'
      }
    }
    
    basicInfoMessages () {
        return {
            'firstName.required':'First name is required',
            'lastName.required':'Last name is required',
        }
      }
    
    async validateBasicInfo (data) {
        return validate(data, this.basicInfoRules(), this.basicInfoMessages())
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}



module.exports = ProfileValidation