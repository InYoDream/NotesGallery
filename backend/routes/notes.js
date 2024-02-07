const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

//Route 1 helps us to fetch all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2 to add notes
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title length should be of minimum 3 characters").isLength({
      min: 3,
    }),
    //body('description','Enter a valid email').isEmail(),
    body("description", "Description cannot be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const {title , description , tag} =req.body;  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newnote = await Note.create({
        title ,
        description ,
        tag ,
        user: req.user.id
      });
      const savedNote =  newnote.save;
      res.send('Successfully saved');
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


//Route no 3 for updating an existing note in our application
router.put("/updatenote/:id" , fetchuser , async (req,res)=>{
  try{
    const {title , description , tag } = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    //nxt step is to find the note that needs to be updated 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")};
    //in case user wants to access some other person's notes
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not allowed")};
    note  = await Note.findByIdAndUpdate(req.params.id , {$set: newNote} , {new:true});
    res.send(note);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

//Route 4 for deletion of a note  
router.delete("/deletenote/:id" , fetchuser , async (req,res)=>{
  try{
    //nxt step is to find the note that needs to be updated 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")};
    //in case user wants to access some other person's notes
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not allowed")};
    note  = await Note.findByIdAndDelete(req.params.id);
    res.send("Success , note has been deleted");
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports = router;
