import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AssignmentForm from '../components/AssignmentForm';
import '../assets/css/announcement.css';

const Classroom = (props) => {
  console.log(props);

  let location = useLocation();

  const [subject, setSubject] = useState("");
  const [student , setStudent] = useState(false) ;

  useEffect(() => {
    console.log(location);
    console.log(location.state.classid);
    setSubject(location.state.sub) ;
    setStudent(location.state.isStudent) ;
  }, []);

  function handleChange(e){
     console.log(e.target.value);

  }

  return (
    <div>
      <h1>{subject}</h1>
      {student?null:<AssignmentForm classid={location.state.classid} sub={subject}/>}

      <form method="post" enctype="multipart/form-data">
        <h1 class='title'>Announce something to your class</h1>
        <input placeholder="Start typing" type="text" name="announcement" required="" onChange={handleChange}/>

         <input type="file"
            id="uploadedFile"  
            accept="image/png, image/jpeg"/>

          <button class="button">Post</button>
 </form>
     </div> 
  );
  //   }
};

export default Classroom;
