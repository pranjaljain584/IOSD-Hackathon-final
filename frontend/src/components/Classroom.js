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
  const [file, setFile] = useState(null);

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
    // console.log('TARGET->>>>>', e);
    setFile(e.target.files[0]);


    // console.log(e);
  }

  function handlePost(e) {
    
    e.preventDefault();

    const config = {
      headers: {
        // 'Content-Type': 'application/pdf',
        'x-auth-token': localStorage.token,
      },
    };

    // const body = {
    //   text,
    //   material: file,
    //   id: classId,
    // };

    const data = new FormData();
    data.append('material', file);
    data.append('text' , text) ;
    data.append('id' , classId) ;


    // console.log('material ->>>>', body.material);

    axios
      .post('http://localhost:5000/api/material', data, config)
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
        <h3 className='title'>Announce something to your class</h3>
        <input
          placeholder='Start typing'
          type='text'
          name='announcement'
          // required='true'
          onChange={handleChange}
        />

        <input
          onChange={(e) => handleFileChange(e)}
          type='file'
          id='uploadedFile'
          // accept='application/pdf'
        />

        <button class='button' onClick={handlePost}>
          Post
        </button>
      </form>

      {/* <a href='blob:http://localhost:3000/d75ec955-ebef-4434-8a55-1e6e84e20569'>
        {' '}
        pdf{' '}
      </a> */}
    </div>
  );
  //   }
};

export default Classroom;
