const Route = use('Route')

Route.group(() =>{
  
    Route.post('/createComment', 'Comment/CommentController.createComment')
    Route.get('/getComment/:id', 'Comment/CommentController.getComment')
    Route.post('/deleteComment', 'Comment/CommentController.deleteComment')
    Route.post('/editComment', 'Comment/CommentController.editComment')
    
    
}).prefix('comment')