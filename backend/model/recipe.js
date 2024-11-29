const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const recipe = mongoose.model('recipe', recipeSchema)
module.exports = recipe