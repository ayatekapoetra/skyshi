'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/activity-groups', 'ActivityController.activityAll')
Route.post('/activity-groups', 'ActivityController.activityPost')
Route.get('/activity-groups/:id', 'ActivityController.activityID')
Route.patch('/activity-groups/:id', 'ActivityController.activityUpdate')
Route.delete('/activity-groups/:id', 'ActivityController.activityDelete')

Route.get('/todo-items', 'TodoController.todoAll')
Route.post('/todo-items', 'TodoController.todoPost')
Route.get('/todo-items/:id', 'TodoController.todoID')
Route.patch('/todo-items/:id', 'TodoController.todoUpdate')
Route.delete('/todo-items/:id', 'TodoController.todoDelete')
