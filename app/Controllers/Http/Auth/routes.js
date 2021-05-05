
const Route = use('Route')

Route.group(() =>{
  
    Route.post('/register', 'Auth/AuthController.registerUser')
    Route.get('/logout', 'Auth/AuthController.logout')
    Route.post('/login', 'Auth/AuthController.login')
    Route.post('/verify_reg_email', 'Auth/AuthController.verifyRegEmail')
    Route.post('/send_resetLink', 'Auth/AuthController.sendResetLink')
    Route.post('/verify_pass_reset_code', 'Auth/AuthController.verifyPasswordResetCode')
    Route.post('/password_reset', 'Auth/AuthController.passwordReset')
    
    
  }).prefix('auth')