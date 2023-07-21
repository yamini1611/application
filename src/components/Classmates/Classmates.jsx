import React, { useState, useEffect } from 'react';
import '../Classmates/Classmates.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Authentication/Context';

export default function Classmates() {
  const { user: loggedInUser } = useContext(UserContext);
  const [classmates, setClassmates] = useState([]);

  useEffect(() => {
    fetchClassmates();
  });
  

  const fetchClassmates = async () => {
    try {
      const response = await axios.get('http://localhost:4000/login');
      const userData = response.data;

      const filteredClassmates = userData.filter(user => user.name && user.email !== loggedInUser.email);
      setClassmates(filteredClassmates);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const totalNames = classmates.reduce((count, item) => {
    return item.hasOwnProperty('name') ? count + 1 : count;
  }, 0);

  return (
    <div className='container' id='con'>
      <h2 id='teacher'>Teacher</h2>
      <hr id='line' />
      <div style={{ margin: 20 }}>
        <h4 style={{ marginLeft: 90 }}>Pallavi Katari</h4>
      </div>
      <hr id='line' />
      <div style={{ marginTop: 100 }}>
        <h2 id='teacher'>
          Classmates <span style={{ fontSize: 20, marginLeft: 600 }}>{totalNames} students</span>
        </h2>

        {classmates.map((classmate) => (
          <div key={classmate.id} style={{ padding: 10 }}>
            <h4 style={{ paddingLeft: 98 }}>{classmate.name}</h4>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
