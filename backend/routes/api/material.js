const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Classroom = require('../../models/classroom');
const Material = require('../../models/Material');

router.post(
  '/',
  [
    auth,
    // check('text', 'Text is required!').not().isEmpty()
  ],
  async (req, res) => {
    try {
      let text = '';
      let file = '';
      let classid ;

      const xyz = await Material.uploadedMaterial(req, res, function (err) {
        if (err) {
          console.log('****Multer err', err);
        }

        text = req.text;
        classid = req.id;
        console.log('---------->>', req.file);

        if (req.file) {
          console.log( "----------" , req.file.path);

          file = Material.materialPath + '/' + req.file.path;
        }
      });

      console.log("xyz->>>>>" , xyz) ;
      console.log('material->>>>>', file);

      const newMaterial = new Material({
        text: text,
        material: file,
        classroom: classid,
      });

      
      await newMaterial.save() ;

      res.json('success');

    } catch (err) {

      console.error('@#$%^&*^%$#', err.message);
      res.status(500).send('Server error');

    }
  }
);

module.exports = router;
