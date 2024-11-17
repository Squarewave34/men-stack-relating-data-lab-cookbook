const express = require('express')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const Ingredient = require('../models/ingredient')

const router = express.Router()

router.get('/', async(req, res)=>{
  try{
    const populatedRecipes = await Recipe.find({}).populate('owner')

    res.render('index.ejs', {recipes: populatedRecipes})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
})

router.get('/home/users', async(req, res)=>{
  const users = await User.find()
  res.render('home/users.ejs', {users})
})

router.get('/home/:userId', async(req, res)=>{
  const id = req.params.userId
  const user = await User.findById(id)
  const recipes = await Recipe.find({owner: id})
  res.render('home/user.ejs', {user, recipes})
})

router.get('/home/:userId/:recipeId', async(req, res)=>{
  const id = req.params.userId
  const recipe = await Recipe.findById(req.params.recipeId)
  const ingredients = await Ingredient.find({owner: id})
  let usedIngredients = []

  ingredients.forEach((ingredient)=>{
    if(recipe.ingredients.includes(ingredient._id)){
      usedIngredients.push(ingredient.name)
    }
  })

  res.render('home/recipe.ejs', {recipe, ingredients: usedIngredients})
})

module.exports = router