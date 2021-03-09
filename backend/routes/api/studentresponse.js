const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Studentresponse = require('../../models/studentresponse');

router.post('/',
  [
    auth,
    check('text','Text is required!').not().isEmpty()
  ]
  ,async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const response=new Studentresponse({
        text:req.body.text,
        user:req.user.id,
        assignmentid:req.body.assignmentid
      });

      const newresponse=await response.save();

      res.json(newresponse);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id',auth,async(req,res)=>{
  try {
    const s = await Studentresponse.find({assignmentid:req.params.id});
    res.json(s);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports=router;
