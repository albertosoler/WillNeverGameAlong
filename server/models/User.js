const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email:String,
    age: Number,
    country:String,
    city:String,
   
    imgUrl:{ 
      type: String, 
      default: "../public/img/user-placeholder.png" }  
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
