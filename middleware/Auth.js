const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const checkAuth = async (req, res, next) => {

//    console.log("Auth")
   const { token } = req.cookies
    
    if (!token) {
        req.flash('error', 'Unauthorized Login')
        res.redirect('/login')

    } else {
        const data = jwt.verify(token, 'pnidnfmsfhd7327632nsx7')
        //console.log(data)
        const userdata = await UserModel.findOne({_id:data.ID})
       // console.log(userdata)
       req.userdata =userdata
        
       
        next()
    }

}
module.exports = checkAuth