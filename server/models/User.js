const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email:String,
    age: Number,
    country:String,
    city:String,
   
    image:{ 
      type: String, 
      default: "https://tmpfilecdn.freelogodesign.org/850385c0-dd1f-4035-9a81-779c89fd6848.png " }  
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
