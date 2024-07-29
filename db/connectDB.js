const mongoose = require("mongoose")

const localURL = "mongodb://127.0.0.1:27017/blogprojectexpress"
// const liveurl= "mongodb+srv://soravrathor786:sorav1@cluster0.tkmjxwk.mongodb.net/blogproject?retryWrites=true&w=majority&appName=Cluster0"
const liveurl = "mongodb+srv://soravrathor786:<LTMyTR3dqK85mh8l>@cluster0.tkmjxwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connect = () => {
    return mongoose.connect(localURL)
        .then(() => {
            console.log('connect success')
        }).catch((error) => {
            console.log(error)
        })
}
module.exports = connect