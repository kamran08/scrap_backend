const Route = use('Route')

Route.group(() =>{
  
    Route.post('/createReply', 'Reply/ReplyController.createReply')
    Route.get('/getReply/:id', 'Reply/ReplyController.getReply')
    Route.post('/deleteReply', 'Reply/ReplyController.deleteReply')
    Route.post('/editReply', 'Reply/ReplyController.editReply')
    
    
}).prefix('reply')