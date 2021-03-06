const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject:{
      type:String,
      required:true
    },
    due:{
      type:String
    }

  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;
