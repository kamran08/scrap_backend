const Route = use('Route')

Route.group(() =>{
    
    Route.post('/createFeed', 'Feed/FeedController.createFeed')
    Route.post('/uploadImages', 'Feed/FeedController.uploadImages')
    Route.get('/getFeed', 'Feed/FeedController.getFeed')
    
}).prefix('feed')

// Route.post('/uploads', 'Feed/FeedController.uploadImages')