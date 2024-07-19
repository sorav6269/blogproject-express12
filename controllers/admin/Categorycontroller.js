const CategoryModel = require('../../models/category')

class CategoryController {
    static display = async (req, res) => {
        try {
            const {name,image,role} = req.userdata
            const category = await CategoryModel.find()
            //  console.log(category)
            res.render('admin/category/display', {n:name,i:image, c: category,role:role,msg:req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static categoryInsert = async (req, res) => {
        try {
            // console.log(req.body)  //input name(n)
            const result = new CategoryModel({
                name: req.body.n
            })
            await result.save()
            req.flash('success', 'Register Successfully Insert! plz')
            res.redirect('/admin/categorydisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static categoryView = async (req, res) => {
        try {
            const id = req.params.id
            const {name,image,role} = req.userdata
            //console.log(id)
            const view = await CategoryModel.findById(id)
            //  console.log(category)
            res.render('admin/category/view', {n:name,i:image,role:role, v: view })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryEdit = async (req, res) => {
        try {
            const {name,image,role} = req.userdata
            const edit = await CategoryModel.findById(req.params.id)
            //  console.log(category)
            res.render('admin/category/edit', {n:name,i:image, e: edit,role:role })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryUpdate = async (req, res) => {
        try {
            await CategoryModel.findByIdAndUpdate(req.params.id, {
                name: req.body.n

            })
            req.flash('success', 'category Update Success')

            res.redirect('/admin/categorydisplay')


        } catch (error) {
            console.log(error)
        }
    }

    static categoryDelete = async (req, res) => {
        try {
            await CategoryModel.findByIdAndDelete(req.params.id)
            req.flash('success', 'category Delete Success')
            res.redirect('/admin/categorydisplay')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = CategoryController