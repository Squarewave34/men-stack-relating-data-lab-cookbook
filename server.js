const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express();

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

const port = process.env.PORT ? process.env.PORT: "3000"

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", ()=>{
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
})

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))



app.listen(port, ()=>{
  console.log(`the express app is ready on port ${port}`);
})

app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView)

// these two must be below the session init
const generalController = require('./controllers/general')
const authController = require('./controllers/auth')
const recipesController = require('./controllers/recipes')
const ingredientsController = require('./controllers/ingredients')

app.use("/", generalController)
app.use("/auth", authController)
app.use("/recipes", recipesController)
app.use("/ingredients", ingredientsController)

app.use((req, res, next) =>{
  if(req.session.message){
    res.locals.message = req.session.message
    req.session.message=null
  }else{
    res.locals.message=null
  }
  next()
})

app.get("/vip-lounge", isSignedIn, (req, res) => {
  res.send(`Welcome to the party ${req.session.user.username}.`);
});