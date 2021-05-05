const Route = use('Route')

Route.group(() =>{

    Route.get('/getUser', 'Profile/ProfileController.getUser')
    Route.post('/updateBasicInfo', 'Profile/ProfileController.updateBasicInfo')
    Route.post('/updateSocialLink', 'Profile/ProfileController.updateSocialLink')
    Route.post('/updatePhone', 'Profile/ProfileController.updatePhone')
    Route.post('/emailUpdate', 'Profile/ProfileController.emailUpdate')
    Route.post('/verifyEmailUpdate', 'Profile/ProfileController.verifyEmailUpdate')
    Route.post('/changePassword', 'Profile/ProfileController.changePassword')
    Route.post('/verifyChangePasswordCode', 'Profile/ProfileController.verifyChangePasswordCode')
    Route.post('/uploadImages', 'Profile/ProfileController.uploadImages')
    
  }).prefix('profile') 