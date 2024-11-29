const recipe = require('../model/recipe')
const path = require('path')
const fs = require('fs')

module.exports.addRecipe = async(req, res)=> {
    try {
        const Recipes = await recipe.findOne({name: req.body.name})
        if(Recipes){
            res.status(400).json({success: false, message: 'Recipe already exist.'})
        }
        if(req.file){
            req.body.image = req.file.filename
        }
        const data = await recipe.create(req.body)
        res.status(200).json({success: true, message: 'Recipe created successfylly.', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'recipe adding error', error})
    }
}

module.exports.getRecipe = async (req, res)=> {
    try {
        const data = await recipe.find({})
        if(data.length <= 0){
           return res.status(404).json({success: false, message: 'Recipe not found'})
        }       
        res.status(200).json({success: true, message: 'Recipe get successfully.', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'Recipe getting error', error})
    }
}

module.exports.deleteRecipe = async (req, res)=> {
    try {
        const recipeImage = await recipe.findById(req.query.id)
        if(recipeImage.image){
            const oldImage = path.join(__dirname, '../uploades/Recipe/', recipeImage.image)
            fs.unlinkSync(oldImage)
        }
        const data = await recipe.findByIdAndDelete(req.query.id)
        res.status(200).json({success: true, message: 'Recipe deleted successfully', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'Delete recipe error', error})
    }
}

module.exports.editRecipe = async (req, res)=> {
    try {
        const data = await recipe.findById(req.query.id)
        res.status(200).json({success: true, message: 'Recipe edit data get successfully', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'Recipe edit error', error})
    }
}

module.exports.editedRecipe = async (req, res)=> {
    try {
        console.log(req.body)
        console.log(req.file.filename)
        const recipeImage = await recipe.findById(req.query.id)

        if(recipeImage.image){
            const oldImage = path.join(__dirname, '../uploades/Recipe/', recipeImage.image)
            fs.unlinkSync(oldImage)
        }
        if(req.file){
            req.body.image = req.file.filename
        }else{
            req.body.image = recipeImage.image  
        }

        const data = await recipe.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({success: true, message: 'Recipe edited successfully.', data})

    } catch (error) {
        res.status(400).json({success: false, message: 'Recipe edited error', error})
    }
}