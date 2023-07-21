import React from 'react'
import { useState, useEffect } from 'react';
import '../Classmates/Classmates.css'
import axios from 'axios';
export default function Classmates() {
    const [user, setUser] = useState([]);
    useEffect(() => {

        fetchdetails();
        
    }, [])

    const fetchdetails = async () => {
        try {
          const response = await axios.get('http://localhost:4000/login');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    return (
        <div className='conatiner' id='con' >
            <h2 id='teacher'>Teacher</h2>
            <hr id='line'></hr>
            <div style={{ margin: 20 }}>
                <h4 style={{marginLeft:90}}>Pallavi Katari</h4>
            </div>
            <hr id='line'></hr>
            <div style={{marginTop:100 }}><h2 id='teacher'>Classmates  </h2>
            {user.map((item) => (
                <div key={item.id} style={{padding:10}}>
                    <h4  style={{paddingLeft:98}}>{item.name}</h4>
                    <hr ></hr>

                </div>
            ))}</div>
            
        </div>
    )
}