const Route = use('Route')

Route.group(() =>{
    
    Route.post('/createFeed', 'Feed/FeedController.createFeed')
    Route.post('/uploadImages', 'Feed/FeedController.uploadImages')
    Route.get('/getFeed', 'Feed/FeedController.getFeed')
    Route.post('/deleteFeed', 'Feed/FeedController.deleteFeed')
    Route.post('/editFeed', 'Feed/FeedController.editFeed')
    Route.get('/getGalryImages', 'Feed/FeedController.getGalryImages')
}).prefix('feed')

// Route.post('/uploads', 'Feed/FeedController.uploadImages')