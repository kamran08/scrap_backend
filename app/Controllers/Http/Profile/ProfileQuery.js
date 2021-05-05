const User = use('App/Models/User')

class ProfileQuery {  
    
    
    getUserInfo(column, value, id, firstName, lastName, country, birthDate, gender, profilePic){
        return User.query().where(column, value).select(id, firstName, lastName, country, birthDate, gender, profilePic).first()
    }   
    
    updateUserInfo(column, value, profile){
        return User.query().where(column, value).update(profile)
    }
    
    countUserFieldByKey(column, value){
        return User.query().where(column, value).getCount()
     }
    
    
    
    
    
    
    
}


module.exports = ProfileQuery