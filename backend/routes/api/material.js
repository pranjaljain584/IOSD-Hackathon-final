const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Classroom = require('../../models/classroom');
const Material = require('../../models/Material');

router.post(
  '/',
  [auth, check('text', 'Text is required!').not().isEmpty()],
  async (req, res) => {
    try {

      // console.log("#########" , req) ;
      const text = req.body.text ;
      const file = '';
      const classid = req.body.id;

      console.log("@@@@@@@@@" , req.body.material) ;

      if (req.body.material) {
        console.log(req.body.material);
        file = Material.materialPath + '/' + req.body.material;
      }

      const newMaterial = new Material({
        text: text,
        material: file,
        classroom: classid,
      });

      await newMaterial.save();
      res.json('Success');

    } catch (err) {
        console.error("@#$%^&*(&^%$#",err.message);
        res.status(500).send('Server error');
    }
  }
);

module.exports = router;
