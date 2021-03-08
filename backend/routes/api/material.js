const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Classroom = require('../../models/classroom');
const Material = require('../../models/material');

router.post(
  '/',
  [auth, check('text', 'Text is required!').not().isEmpty()],
  async (req, res) => {
    try {
      let text = '';
      let filepath = '';
      let classid = '';
      let fileUrl ;

      //console.log(' uppper req  ',req);

      const xyz = await Material.uploadedMaterial(
        req,
        res,
        async function (err) {
          if (err) {
            console.log('****Multer err', err);
          }
          console.log(' req   ', req.body);
          text = req.body.text;
          classid = req.body.id;
          fileUrl = req.body.fileUrl ;
          console.log('---------->>', req.file);

          if (req.file) {
            // console.log( "req.file.path  " , req.file.path);
            // console.log(" material path ",Material.materialPath);
            filepath = Material.materialPath + '/' + req.file.path;
          }

          console.log(' file path : ', filepath);
          console.log(' text  ', text);
          console.log(' classroom  ', classid);

          try {
            const newMaterial = new Material({
              text: text,
              material: filepath,
              classroom: classid,
              fileUrl:fileUrl
            });

            await newMaterial.save();
          } catch (err) {
            console.error('@#$%^&*^%$#', err.message);
            res.status(500).send('Server error');
          }
        }
      );

      console.log('xyz->>>>>', xyz);
      //  console.log('material->>>>>', filepath);

      res.json('success');
    } catch (err) {
      console.error('@#$%^&*^%$#', err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/:id', auth, async (req, res) => {
  try {
    const classid = req.params.id;
    const classroom2 =await Classroom.find({ _id: classid });
    if (!classroom2) {
      return res.json('No Class Found!');
    }

    const materialArray = await Material.find({ classroom: classid });

    console.log("backend material array ---->.>" , materialArray) ;

    res.json(materialArray);
  } catch (err) {
    console.error('@#$%^&*^%$#', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
