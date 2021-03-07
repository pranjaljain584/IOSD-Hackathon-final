const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const MATERIAL_PATH = path.join('/uploads/classroom/material');

const Schema = mongoose.Schema;

const MaterialSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Classroom',
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb is callback fn
    cb(null, path.join(__dirname, '..', MATERIAL_PATH)); //this is the exact path where file is going to be stored
    // relative to current position
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

MaterialSchema.statics.uploadedMaterial = multer({ storage: storage }).single(
  'material'
);
MaterialSchema.statics.materialPath = MATERIAL_PATH;

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
