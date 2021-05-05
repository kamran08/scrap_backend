'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.get('/myuser', 'UserController.getUser')


//All-imported-routes
require('../app/Controllers/Http/Auth/routes')
require('../app/Controllers/Http/Profile/routes')
require('../app/Controllers/Http/Feed/routes')
require('../app/Controllers/Http/Comment/routes')
require('../app/Controllers/Http/Reply/routes')
require('../app/Controllers/Http/SocialLogin/routes')
require('../app/Controllers/Http/Like/routes')





// Route.group(() =>{
//   Route.post('/register', 'Auth/AuthController.registerUser')
 
Route.get('/myuser', 'UserController.getUser')
// }).prefix('auth')

// Route.post('/create-post', 'UserController.createpost')
// Route.post('/uploads', 'UserController.upload')
// Route.post('/verify_email', 'UserController.verify_email')
// Route.post('/verify_code', 'UserController.verify_code')
// Route.post('/send_resetLink', 'UserController.sendResetLink')
// Route.post('/password_reset', 'UserController.passwordReset')

// Route.post('/updateSocialLink', 'UserController.updateSocialLink')
// Route.post('/emailUpdate', 'UserController.emailUpdate')
// Route.post('/verifyEmailUpdate', 'UserController.verifyEmailUpdate')
// Route.post('/changePassword', 'UserController.changePassword')
// Route.post('/verifyChangePassword', 'UserController.verifyChangePassword')

//social login
// Route.get('/auth/:provider', 'SocialLoginController.redirectToProvider').as('social.login')
// Route.get('/authenticated/:provider', 'SocialLoginController.handleProviderCallback').as('social.login.callback')

// Route.get('/login', 'UserController.user')
// Route.post('/login', 'UserController.login')
// Route.post('/post', 'UserController.getUser')
// Route.get('/logout', 'UserController.logout')
