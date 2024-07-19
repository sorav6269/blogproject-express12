const mongoose = require("mongoose")

const localURL = "mongodb://127.0.0.1:27017/blogprojectexpress"
const liveUrl ="mongodb+srv://pn123:pn123@cluster0.5ud8ykv.mongodb.net/blogproject?retryWrites=true&w=majority&appName=Cluster0"

const connect = () => {
    return mongoose.connect(liveUrl)
        .then(() => {
            console.log('connect success')
        }).catch((error) => {
            console.log(error)
        })
}
module.exports = connect