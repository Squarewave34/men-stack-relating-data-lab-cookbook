const express = require('express')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const Ingredient = require('../models/ingredient')

const router = express.Router()

router.get('/', async(req, res)=>{
  try{
    const id = req.session.user._id;
    const recipes = await Recipe.find({owner: id})
    res.render('recipes/index.ejs', {recipes})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
})

router.get('/new', async(req, res)=>{
  const ingredients = await Ingredient.find()
  res.render('recipes/new.ejs', {ingredient: ingredients})
})

router.get("/success", async(req, res)=>{
  res.render("recipes/success.ejs")
})

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await Recipe.create(req.body);
  res.redirect('/recipes/success');
});

router.get('/:recipeId', async(req, res)=>{
  const id=req.params.recipeId
  const recipe = await Recipe.findById(id)
  res.render('recipes/show.ejs', {recipe: recipe})
})

module.exports = router