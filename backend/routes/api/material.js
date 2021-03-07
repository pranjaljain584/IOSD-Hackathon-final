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
      const file = '';
      const text = '';
      const classid = '';

      Material.uploadedMaterial(req, res, function (err) {
        if (err) {
          console.log('******MUlter', err);
        }

        if (req.file) {
          file = Material.materialPath + '/' + req.file.filename;
        }

        text = req.body.text;
        classid = req.body.id;
      });

      const newMaterial = new Material({
        text: text,
        material: file,
        classroom: classid,
      });

      await newMaterial.save();
      res.json('Success');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  }
);

module.exports = router;
