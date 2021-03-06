import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AssignmentForm from '../components/AssignmentForm'





const Classroom = (props) => {
  console.log(props);

  let location = useLocation();

  const [subject, setSubject] = useState("");

  useEffect(() => {
    console.log(location);
    console.log(location.state.classid);
    setSubject(location.state.sub) ;
  }, []);

  return (
    <div>
      <h1>{subject}</h1>
      <AssignmentForm classid={location.state.classid} sub={subject}/>
    </div>
  );
  //   }
};

export default Classroom;
