const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Task = require('../../models/task');

router.post(
  '/',
  [auth, check('taskName', 'Task Name is required!').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const newtask = new Task({
        taskName: req.body.taskName ,
        isChecked: req.body.isChecked ,
        user: req.user.id,
      });

      const newTask = await newtask.save();
      res.status(200).send("succesfully added");

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/' , auth , async(req,res)=>{

    try{
        let tasksList = await Task.findById(req.user.id).sort(-createdAt);

        if (tasksList) {
          return res.send(tasksList);
        }else{
            return res.send('No Tasks To Show') ;
        }

    }catch(err){

        console.error(err.message);
        res.status(500).send('Server error');

    }

});

router.delete('/:id' , auth , async (req,res)=>{
    try {

        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({ msg: 'Task not Found' });
        }

        if(req.user.id != Task.user.toString()){
            res.status(401).json({ msg: 'not authorized to del' });
        }

        task.remove() ;
        res.json({msg:'removed'}) ;

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}) ;

module.exports = router;
