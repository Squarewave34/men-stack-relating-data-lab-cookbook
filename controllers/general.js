const express = require('express')
const Recipe = require('../models/recipe')
const User = require('../models/user')

const router = express.Router()

router.get('/', async(req, res)=>{
  try{
    const populatedRecipes = await Recipe.find({}).populate('owner')
    populatedRecipes.forEach((recipe)=>{
      console.log(recipe.owner.username);
    })
    res.render('index.ejs', {recipes: populatedRecipes})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
})

module.exports = router