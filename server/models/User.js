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
          default: "http://fondosparacelulares.net/wp-content/uploads/2014/08/fondos-de-F%C3%BAtbol-en-hd3.jpg" }  
        
     
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
