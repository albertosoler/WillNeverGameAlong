const express = require('express');
const router = express.Router();
const debug = require('debug')("server:auth");
const User = require("../models/User");
const upload = require('../configs/multer');
const bcrypt = require('bcrypt');
const passport = require('passport');

///FUNCIONAAAAAAAAA/////

router.get('/profile', (req, res, next) => {
   userId  = req.user._id;
    
  
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Something went wrong' });
      res.status(200).json({ user:user})
    });
});

////FUNCIONAAAAA////


router.put('/edit/:id',(req, res, next) => {
  console.log(req.body)
    const userId  = req.params.id;
    const updates = {
      username: req.body.username,
      password:req.body.password,
      email:req.body.email,
      city:req.body.city,
      country:req.body.country,
      };
      
      if (req.body.password !== ""){
        const password = req.body.password;
        let salt = bcrypt.genSaltSync(10);
        let hashPass = bcrypt.hashSync(password, salt);
        updates.password = hashPass;
      }else{
        const password = password;
        }
      
      

    
    User.findByIdAndUpdate(userId,updates, {new:true})
    .then(user => res.status(200).json({user}))
     .catch(e => res.status(500).json(e))
  
});


//////FUNCIONA//////

    
    router.post('/delete/:id',(req, res, next) => {
      const userId  = req.params.id;
      console.log("req.body");
    
      User.deleteOne({_id:userId}, (err) => {
        if (err) return res.status(500).json({ message: 'Something went wrong' })
        res.status(200).json({ message: 'Borrado correctamente' });
        
      });
    });


      module.exports =router;