const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  name:{
    type: String,
  },
  name:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name:{
    type: [mongoose.Schema.Types.ObjectId],
  },
},{
  timestamps: true
})

const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe