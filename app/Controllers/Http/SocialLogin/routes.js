const Route = use('Route')

Route.group(() =>{

    Route.get('/auth/:provider', 'SocialLogin/SocialLoginController.redirectToProvider').as('social.login')
    Route.get('/authenticated/:provider', 'SocialLogin/SocialLoginController.handleProviderCallback').as('social.login.callback')
    
})