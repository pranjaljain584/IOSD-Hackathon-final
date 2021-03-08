const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Screentime = require('../../models/screentime');

router.post('/',auth,async(req,res)=>{
  try {

    let ar=[];
    const item={
      second:req.body.second,
      minute:req.body.minute,
      hour:req.body.hour
    }

    const u=await Screentime.findOne({user:req.user.id});

    console.log('user',u);

    if(u)
    {
      const updatedScreentime=await Screentime.update({user:req.user.id},{$addToSet:{
        'time':item
      }})

      return res.json(u);
    }

    ar.push(item);

    const newScreentime = new Screentime({
      user:req.user.id,
      time:ar
    })

    await newScreentime.save();

    res.json(newScreentime);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports=router;
