import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AssignmentForm from '../components/AssignmentForm';
import '../assets/css/announcement.css';
import axios from 'axios';
import StudyMaterialList from './StudyMaterialList';
import ClassroomForm from './ClassroomForm';

const Classroom = (props) => {
  console.log(props);

  let location = useLocation();

  const [subject, setSubject] = useState('');
  const [student, setStudent] = useState(false);
  const [classId, setClass] = useState('');
  const [studyMaterial , setStudyMaterial] = useState([]);
  const [teacher,setTeacher] = useState("") ;
  const APIURL = 'http://localhost:3000';

  useEffect(() => {
    console.log("Location--->>>",location);
    // console.log(location.state.classid);
    setSubject(location.state.sub);
    setStudent(location.state.isStudent);
    setClass(location.state.classid);

    if(!location.state.isStudent){
      setTeacher(location.state.name) ;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    axios
      .get(`http://localhost:5000/api/material/${location.state.classid}` , config)
      .then((res) => {
        console.log( "Material array --->>" , res.data);
        setStudyMaterial(res.data) ;
      })
      .catch((err) => console.log(err));

  }, []);

 
  console.log("material array ----->>>" , studyMaterial) ;

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
      <h1>{subject}</h1>
      {student ? null : (
        <AssignmentForm classid={location.state.classid} sub={subject} />
      )}
      </div>
      {student ? null : <ClassroomForm 
        student={student}
        subject={subject}
        classId={classId}
      />}
      
      {studyMaterial.map(( smat , key ) => {
        return (
          <StudyMaterialList
            key={key}
            text={smat.text}
            material={`http://localhost:5000/${smat.material}`}
            subject={subject}
            teacher={teacher}
          />
        );
      })}
      
    </div>
  );
  //   }
};

export default Classroom;

  // const [text, setText] = useState('');
  // const [file, setFile] = useState(null);

 // function handleChange(e) {
  //   setText(e.target.value);
  // }

  // function handleFileChange(e) {
  //   // console.log('TARGET->>>>>', e);
  //   setFile(e.target.files[0]);

  // }

  // function handlePost(e) {
    
  //   e.preventDefault();

  //   const config2 = {
  //     headers: {
  //       // 'Content-Type': 'application/pdf',
  //       'x-auth-token': localStorage.token,
  //     },
  //   };

  //   const data = new FormData();
  //   data.append('material', file);
  //   data.append('text' , text) ;
  //   data.append('id' , classId) ;

  //   axios
  //     .post('http://localhost:5000/api/material', data, config2)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

// {
//   /* {student ? null :<form>
//         <h3 className='title'>Announce something to your class</h3>
//         <input
//           placeholder='Start typing'
//           type='text'
//           name='announcement'
//           // required='true'
//           onChange={handleChange}
//         />

//         <input
//           onChange={(e) => handleFileChange(e)}
//           type='file'
//           id='uploadedFile'
//         />

//         <button class='button' onClick={handlePost}>
//           Post
//         </button>
//       </form>} */
// }