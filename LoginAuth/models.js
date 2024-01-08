const mongoose = require("mongoose"); 
  
const userSchema = new mongoose.Schema({ 
    email: { type: String, required: true, unique: true }, 
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    Name: { type: String, required: true },
    regno: { type: Number, required: true },
    branch: { type: String, required:true },
    learnerid: { type: String, required: true, unique: true },
    upiid: { type: String, required: true, unique: true },
    transid: { type: String, required: true, unique: true }
}); 
  
const User = mongoose.model("User", userSchema); 
  
module.exports = User; 