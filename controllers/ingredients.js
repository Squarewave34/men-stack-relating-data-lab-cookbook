const express = require('express')
const Ingredient = require('../models/ingredient')

const router = express.Router()

router.get('/', async(req, res)=>{
  try{
    const id = req.session.user._id
    const ingredients = await Ingredient.find({owner: id})
    res.render('ingredients/index.ejs', {ingredients})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
})

router.get('/new', async(req, res)=>{
  res.render('ingredients/new.ejs')
})

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  const ingredient = await Ingredient.findOne({owner: req.body.owner, name: req.body.name})

  if(!ingredient){
    await Ingredient.create(req.body);
  }

  res.redirect('../ingredients');
});

router.post('/quickAddition', async(req, res)=>{
  req.body.owner = req.session.user._id;
  await Ingredient.create(req.body);
  res.redirect('../recipes/new');
})

module.exports = router