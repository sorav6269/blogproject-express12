const express = require('express')
const frontcontroller = require('../controllers/frontcontroller')
const admincontroller = require('../controllers/admin/admincontroller')
const CategoryController = require('../controllers/admin/Categorycontroller')
const Blogcontroller = require('../controllers/admin/Blogcontroller')
const UserController = require('../controllers/usercontroller')
const route = express.Router()
const checkAuth = require('../middleware/Auth')

//routing
route.get('/', frontcontroller.home)
route.get('/about', frontcontroller.about)
route.get('/blog', frontcontroller.bloglist)
route.get('/contact', frontcontroller.contact)
route.get('/login', frontcontroller.login)
route.get('/details/:id', frontcontroller.blogDetails)
route.get('/signin', frontcontroller.signin)
route.get('/logout', frontcontroller.logout)
route.get('/blogCat/:id', frontcontroller.blogCat)



//admin
route.get('/admin/dashboard',checkAuth, admincontroller.dashboard)

//category
route.get('/admin/categorydisplay',checkAuth, CategoryController.display)
route.post('/admin/categoryInsert',checkAuth,CategoryController.categoryInsert)
route.get('/admin/categoryView/:id',checkAuth,CategoryController.categoryView)
route.get('/admin/categoryEdit/:id',checkAuth,CategoryController.categoryEdit)
route.get('/admin/categoryDelete/:id',checkAuth,CategoryController.categoryDelete)
route.post('/admin/categoryUpdate/:id',checkAuth,CategoryController.categoryUpdate)

//blog
route.get('/admin/blogdisplay',checkAuth, Blogcontroller.display)
route.post('/admin/bloginsert',checkAuth, Blogcontroller.bloginsert)
route.get('/admin/blogView/:id',checkAuth,Blogcontroller.blogView)
route.get('/admin/blogEdit/:id',checkAuth,Blogcontroller.blogEdit)
route.get('/admin/blogDelete/:id',checkAuth,Blogcontroller.blogDelete)
route.post('/admin/updateBlog/:id',checkAuth,Blogcontroller.blogUpdate)

//usercontroller
route.post('/UesrInsert',UserController.Userinsert)
route.post('/verifylogin',UserController.verifylogin)
route.get('/users',checkAuth,UserController.display)
route.post('/updateStatus/:id',checkAuth,UserController.updateStatus)
route.get('/admin/userDelete/:id',checkAuth,UserController.userDelete)
route.get('/admin/userView/:id',checkAuth,UserController.userView)

//verify mail
route.get('/verify',UserController.verifyMail)


module.exports = route