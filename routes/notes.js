const express=require('express');
const router=express.Router();
const Notes=require("../models/Notes")
const fetchuser=require('../middleware/fetchuser')
const { body,validationResult } = require('express-validator');
//router to get all notes
router.get("/getallnotes",fetchuser,async(req,res)=>{
  
   try {
      const note = await Notes.find({ user: req.user.id });
      console.log(note)
      res.json(note)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})



router.post('/addnotes', fetchuser, [
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
       try {

           const { title, description, tag } = req.body;

           // If there are errors, return Bad request and the errors
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
           }
           const note = new Notes({
               title, description, tag, user: req.user.id
           })
           const savedNote = await note.save()

           res.json(savedNote)

       } catch (error) {
           console.error(error.message);
           res.status(500).send("Internal Server Error");
       }
   })


// update note
router.put("/updatenotes/:id",fetchuser,async(req,res)=>{
  
      
      const{title,description,tag}=req.body;
      const newnote={};
      if(title){newnote.title=title}
      if(description){newnote.description=description}
      if(tag){newnote.tag=tag}

      let note=await Notes.findById(req.params.id)
      
      console.log(note)
      if(!note){
         return res.status(401).send("not found")

      }
      if(note.user.toString()!==req.user.id){
         return res.status(401).send("not allowed")
      }
      note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
      res.json(note)
      



  

})

router.delete("/deletenotes/:id",fetchuser,async(req,res)=>{
    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(401).send("not found")

     }
     if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed")
     }
     note=await Notes.findByIdAndDelete(req.params.id)
     res.json("deleted successfully")
})

module.exports=router;