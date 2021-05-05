'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
  Route.post('createLike', 'Like/LikeController.createLike')
  Route.post('createCommentLike', 'Like/LikeController.createCommentLike')
  Route.post('createReplyLike', 'Like/LikeController.createReplyLike')
  Route.get('hellos', 'Like/LikeController.hello')

}).prefix('like')