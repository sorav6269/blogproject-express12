const express = require('express')
//console.log(express)

const app = express()
const port = 3000
const web = require('./routes/web')
const connect = require('./db/connectDB')
const fileUpload=require('express-fileupload')

//connect flash and sessions 
const session= require('express-session')
const flash= require('connect-flash');
var cookieParser = require('cookie-parser')


app.use(cookieParser()) //token get 

//messages
app.use(session({
    secret:'secret',
    cookie:{maxage:6000},
    resave:false,
    saveUninitialized:false,
}))

//flash message
app.use(flash());

//image upload
app.use(fileUpload({useTempFiles:true}))

//data get
app.use(express.urlencoded({extended:false}))

// dbconnect
connect()

//html css template engines
app.set('view engine', 'ejs')

// css image link
app.use(express.static('public'))



//route lode
app.use('/', web)




//server create
app.listen(port, () => console.log("server start localhost:3000"))