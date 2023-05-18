const express=require('express');
const router=express.Router();
const User=require("../models/User")
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

router.post('/createuser',[
   body('name').isLength({min:3}),
   body("email").isEmail(),
   body('password').isLength({min:5}),

], async (req, res)=>{
   let success=false
   const errors=validationResult(req);
  //show error 
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }
//to find same email exist 
   try {
      let user =await User.findOne({email:req.body.email});
      if(user){
         
         return res.status(400).json({success,error:"sorry email already exist"})
      }//if not req is send through body
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      
          

         user=await User.create({
         name:req.body.name,
         password:secPass,
         email:req.body.email
      })
      const data={
         user:{
            id:user.id
         }
      }
      const jwt_secret='hello';
      const jwtdata=jwt.sign(data,jwt_secret);
     
      success=true
      res.json({success,jwtdata})
      //try and catch if any problem occur in code
   } catch (error) {
      console.error(error.message);
      res.status(500).send("some error has occur")
   }
});
 //route 2
   // res.send(req.body)
   //authentication for user to login in 




   router.post('/login', [ 
      body('email', 'Enter a valid email').isEmail(), 
      body('password', 'Password cannot be blank').exists(), 
    ], async (req, res) => {
         let success=false
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      const {email, password} = req.body;
      try {
      
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({error: "Please try to login with correct credentials"});
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
         
          return res.status(400).json({ error: "Please try to login with correct credentials"});
          
        }
       
    
        const data = {
          user:{
            id: user.id
          }
        }
         const jwt_secret='hello';
         const jwtdata=jwt.sign(data,jwt_secret);
        
         success=true
         res.json({success,jwtdata})
         
      } catch (error) {
         console.error(error.message);
      res.status(500).send("some error has occur in server")
      }   
   });

   //route 3
   // router.post('/userid',fetchuser,async (req, res) => {

   //    try {
   //       const userID=req.user.id;
   //       const user=await User.findById(userID).select("-password")
   //       console.log(user)
   //       res.send(user)
   //    } catch (error) {
   //       console.error(error.message);
   //       res.status(500).send("some error has occur in server")
   //    }
   //  });
   router.post('/getuser', fetchuser,  async (req, res) => {

      try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    })
   

module.exports=router
