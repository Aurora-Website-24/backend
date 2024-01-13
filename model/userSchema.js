const mongoose = require("mongoose"); 
  
const userSchema = mongoose.Schema({ 
    googleId: {type: Number, unique: true},
    googleName: {type: String},
    email: {type: String, unique: true},

    name: { type: String, required: true}, 
    phoneNo: { type: Number, required: true}, 
    regNo: { type: Number, required: true },
    branch: { type: String, required:true },
    learnerid: { type: String, required: true, unique: true },
    upiID: { type: String, required: true, unique: true },
    txnID: { type: String, required: true, unique: true },
    screenshot: {type: String, required: true},
    hackathon: {type: Boolean},
    workshops: {type: [String]},
}, {timestamps: true});
  
const userdb = mongoose.model("users", userSchema); 
  
module.exports = userdb; 