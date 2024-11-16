const express = require('express')
const Ingredient = require('../models/ingredient')
const User = require('../models/user')

const router = express.Router()

router.get('/new', async(req, res)=>{
  res.render('ingredients/new.ejs')
})

router.post('/', async (req, res) => {
  await Ingredient.create(req.body);
  res.redirect('../recipes');
});

module.exports = router