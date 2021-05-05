const User = use('App/Models/User')

class AuthQuery {
    
    createUser(user){
       return User.create(user)
    } 
    
    countUserFieldByKey(column, value){
       return User.query().where(column, value).getCount()
    }
    
    updateUserInfo(column, value, user){
      return User.query().where(column, value).update(user)
    }
    
    getUserInfo(column, value){
      return User.query().where(column, value).first()
    }
    
    
   //  verifyResetPasswordCode(column, value, user){
   //    return User.query().where(column, value).update(user)
   //  }
    
   //  updateSocialLink(column, value, social){
   //     return User.query().where(column, value).update(social)
   //  }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
}

module.exports = AuthQuery