import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AssignmentForm from '../components/AssignmentForm';
import '../assets/css/announcement.css';
import axios from 'axios';

const Classroom = (props) => {
  console.log(props);

  let location = useLocation();

  const [subject, setSubject] = useState('');
  const [student, setStudent] = useState(false);
  const [text, setText] = useState('');
  const [classId, setClass] = useState('');
  const [file,setFile] = useState("") ;

  useEffect(() => {
    console.log(location);
    console.log(location.state.classid);
    setSubject(location.state.sub);
    setStudent(location.state.isStudent);
    setClass(location.state.classid);
  }, []);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleFileChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log('file ->>>>', file);
    // console.log(e);
  }

  function handlePost(e) {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    const body = {
      text,
      material: file,
      id: classId,
    };

    axios
      .post('http://localhost:5000/api/material', body, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>{subject}</h1>
      {student ? null : (
        <AssignmentForm classid={location.state.classid} sub={subject} />
      )}

      <form>
        <h3 class='title'>Announce something to your class</h3>
        <input
          placeholder='Start typing'
          type='text'
          name='announcement'
          required=''
          onChange={handleChange}
        />

        <input
          onChange={(e) => handleFileChange(e)}
          type='file'
          id='uploadedFile'
          // accept='image/png, image/jpeg'
        />

        <button class='button' onClick={handlePost}>
          Post
        </button>
      </form>
    </div>
  );
  //   }
};

export default Classroom;
