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
  const id = req.session.user._id;
  const ingredients = await Ingredient.find({owner: id})
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

router.get('/:recipeId/edit', async(req, res)=>{
  try{
    const populatedRecipes = await Recipe.findById(req.params.recipeId).populate('owner')
    const ingredients = await Ingredient.find()
    res.render('recipes/edit.ejs', {recipe: populatedRecipes, ingredient: ingredients})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
})

router.put('/:recipeId', async(req, res)=>{
  try{
    const recipe = await Recipe.findById(req.params.recipeId)
    if(recipe.owner.equals(req.session.user._id)){
      await recipe.updateOne(req.body)
      res.redirect('/recipes/success')
    }else{
      res.send("you can't update a recipe that isn't yours")
    }
  }catch(error){
    console.log(error);
    redirect('/')
  }
})

router.delete('/:recipeId', async(req, res)=>{
  try{
    const recipe = await Recipe.findById(req.params.recipeId)
    if(recipe.owner.equals(req.session.user._id)){
      await recipe.deleteOne()
      res.redirect('/recipes/success')
    }else{
      res.send("you can't delete a recipe that isn't yours")
    }

  }catch(error){
    console.log(error);
    res.redirect('/')
  }
})

module.exports = router