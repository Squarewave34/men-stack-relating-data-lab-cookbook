const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    minlength: [3, "name must be more than 3 characters"],
    maxlength: [10, "name must be less than 11 characters"]
  },
  password:{
    type: String,
    required: true
  }
},{
  timestamps: true //auto adds creation and update time
}
)

const User = mongoose.model("User", userSchema)
module.exports = User