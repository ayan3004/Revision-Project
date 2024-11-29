const express = require('express')
const router = express.Router()
const multer = require('multer')
const recipectl = require('../controller/recipectl')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploades/Recipe')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

router.get('/', recipectl.getRecipe)
router.post('/addrecipe', upload ,recipectl.addRecipe)
router.delete('/delete', recipectl.deleteRecipe)
router.post('/editrecipe', recipectl.editRecipe)
router.put('/edit', upload ,recipectl.editedRecipe)

module.exports = router