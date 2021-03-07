const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const crypto = require('crypto');

const Classroom = require('../../models/classroom');
const User = require('../../models/User');

//Create Classroom
router.post('/',
  [
    auth,
    check('subject','Subject is required!').not().isEmpty()
  ]
  ,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const classcode = crypto.randomBytes(3).toString('hex');

      const newclass=new Classroom({
        subject:req.body.subject,
        code:classcode,
        teacher:req.user.id
      });

      const newClassroom=await newclass.save();
      res.json(newClassroom);

    } catch (err) {
      console.error( "$$$$$$$" , err.message);
      res.status(500).send("Server error");
    }
})

//Join classroom
router.post('/join',auth,async(req,res)=>{
  try {

    const c=await Classroom.findOne({code:req.body.code});

    if(!c)
    {
      return res.json("No classroom found");
    }

    console.log(c);

    const updatedClasses = await User.update(
      {_id:req.user.id},
      {$addToSet:{
      "classes":c._id
    }}
  )

    const newjoinedStudents = await Classroom.update({code:req.body.code},{$addToSet:{
      "joinedStudents":req.user.id
    }})

    res.json(updatedClasses);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports=router;
