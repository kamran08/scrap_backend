'use strict'

const User = use('App/Models/User')
class SocialLoginController {
    
    async redirectToProvider ({ally, params}) {
        console.log('testing-1')
        await ally.driver(params.provider).redirect()
      }
    
      async handleProviderCallback ({params, ally, auth, response}) {
          console.log('testing-2')
        const provider = params.provider
        console.log(provider)
        try {
          const userData = await ally.driver(params.provider).getUser()
    
          const authUser = await User.query().where({
            'provider': provider,
            'provider_id': userData.getId()
          }).first()
          if (!(authUser === null)) {
            await auth.loginViaId(authUser.id)
            return response.redirect('http://localhost:8000/feed')
          }
    
          const user = new User()
          user.firstName = userData.getName()
          user.username = userData.getNickname()
          user.email = userData.getEmail()
          user.provider_id = userData.getId()
          user.profilePic = userData.getAvatar()
          user.provider = provider
    
          await user.save()
    
          await auth.loginViaId(user.id)
          return response.redirect('http://localhost:8000/feed')
        } catch (e) {
          console.log(e)
          response.redirect('/auth/' + provider)
        }
      }
    
}

module.exports = SocialLoginController
