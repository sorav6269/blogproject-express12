
const BlogModel = require('../../models/blog')
const CategoryModel = require('../../models/category')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dyblatmzo',
    api_key: '757875579268529',
    api_secret: 'OaD3lbfPxv_CrCd-pcIFiOtlDKw' // Click 'View Credentials' below to copy your API secret
});

class Blogcontroller {
    static display = async (req, res) => {
        try {
            const {name,image,role} = req.userdata
            const category = await CategoryModel.find()
            const blog = await BlogModel.find()
            res.render('admin/blog/display', {n:name,i:image, c: category, b: blog,role:role })
        } catch (error) {
            console.log(error)
        }
    }
    static bloginsert = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.files.image)
            // image uplaod
            const file = req.files.image
            const uploadImage = await cloudinary.uploader.upload
                (
                    file.tempFilePath, { timeout: 120000 }, {
                    folder: "blogImage"
                }
                )
            console.log(uploadImage)

            const { category, title, description,role } = req.body
            const result = new BlogModel({
                category: category,
                title: title,
                description: description,
                image: {
                    public_id: uploadImage.public_id,
                    url: uploadImage.secure_url
                },
                role:role
            })
            await result.save()
            res.redirect("/admin/blogDisplay")
        } catch (error) {
            console.log(error)
        }
    }

    static blogView = async (req, res) => {
        try {
            const {name,image,role} = req.userdata
            const id = req.params.id
            //console.log(id)
            const view = await BlogModel.findById(id)
            //  console.log(category)
            res.render('admin/blog/view', {n:name,i:image, v: view,role:role })
        } catch (error) {
            console.log(error)
        }
    }

    static blogEdit = async (req, res) => {
        try {
            const {name,image,role} = req.userdata
            const category = await CategoryModel.find()
            const edit = await BlogModel.findById(req.params.id)
            //  console.log(category)
            res.render('admin/blog/edit', {n:name,i:image, e: edit, c: category,role })
        } catch (error) {
            console.log(error)
        }
    }

    static blogUpdate = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            // first delete the image
            if (req.files) {
                const blog = await BlogModel.findById(req.params.id)
                const imageid = blog.image.public_id

                //  console.log(imageid)
                await cloudinary.uploader.destroy(imageid)

                // second update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'blogImage'
                })
                
                var data = {
                    title: req.body.title,
                    description: req.body.description,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                }

            }else {
                var data = {
                    title: req.body.title,
                    description: req.body.description
                }
            }


            const update = await BlogModel.findByIdAndUpdate(req.params.id, data)
            await update.save()
            res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    static blogDelete = async (req, res) => {
        try {
            await BlogModel.findByIdAndDelete(req.params.id)
            req.flash('success', 'blog Delete Success')
            res.redirect('/admin/blogdisplay')
        } catch (error) {
            console.log(error)
        }

    }
}
module.exports = Blogcontroller