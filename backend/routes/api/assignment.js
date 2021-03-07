const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Classroom = require("../../models/classroom");
const User = require("../../models/User");
const Assignment = require("../../models/assignment");

router.post("/add", auth, async (req, res) => {
  try {
    const classid = req.body.id;

    const newAssignmet = new Assignment({
      name: req.body.name,
      subject: req.body.subject,
      due: req.body.due,
    });

    await newAssignmet.save();

    //console.log(" assignment => ",newAssignmet);

    const c = await Classroom.findOne({ _id: classid });

    //console.log(" classroom => ",c);

    for (let i = 0; i < c.joinedStudents.length; i++) {
      const studentid = c.joinedStudents[i];
      //console.log(" student => ",studentid);
      const updatedAssignment = await User.update(
        { _id: studentid },
        {
          $addToSet: {
            assignments: newAssignmet._id,
          },
        }
      );
    }

    res.json("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    // console.log(user);
    if (!user) {
      console.log("no user");
      return;
    }
    let assig = [];
    console.log(user);
    for (var i = 0; i < user.assignments.length; i++) {
      const c = await Assignment.findOne({ _id: user.assignments[i] });

      assig.push(c);
    }
    res.json(assig);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/submit",auth,async(req,res)=>{
  try {
    const user=await User.findOne({_id:req.user.id});
    if(!user){
      res.status(404).send("No User Find!");
    }
    const assignment=await Assignment.findOne({_id:req.body.id});

    if(!assignment){
      res.status(404).send("no assignment exists!");

    }
    console.log(user);
    console.log(assignment);
    // let assign=user.completedAssignments;
    // assign.push(assignment);
    const updatedAssign = await User.update(
      {_id:req.user.id},
      {$addToSet:{
      "completedAssignments":assignment._id
    }}
  )

    res.json("success");
    

  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
})

module.exports = router;
