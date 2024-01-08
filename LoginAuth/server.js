require('dotenv').config()
const mongoose = require("mongoose"); 
const express = require("express"); 
const passport = require("passport"); 
const User = require("./models.js"); 
const localStrategy = require("./passp.js"); 
const controllers = require("./controllers.js"); 
const cookieParser = require("cookie-parser");  
const ejs = require("ejs"); 
const bodyParser = require("body-parser"); 
const routes = require("./pages.js"); 
const session = require("express-session"); 
  
const app = express(); 

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("connected to DB & listening on port ", process.env.PORT)
    }) 
})
.catch((error)=>{
    console.log(error)
})

app.use( 
    session({ 
        secret: "ISTEAurora", 
        resave: false, 
        saveUninitialized: false, 
    }) 
); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.set("view engine", "ejs"); 
  

passport.serializeUser((user, done) => done(null, user.id)); 
passport.deserializeUser((id, done) => { 
    User.findById(id, (err, user) => done(err, user)); 
}); 

app.use("/api/", controllers); 
app.use("/", routes); 