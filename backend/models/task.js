const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    isChecked:{
        type:Boolean ,
        default:false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectID,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
