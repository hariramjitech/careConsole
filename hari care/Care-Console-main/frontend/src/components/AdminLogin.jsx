import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AdminLogin.css'; // Link to the new CSS file

const AdminLogin = () => {

  const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [adminInfo,setAdminInfo] = useState(null);
    const navigate = useNavigate();

    const submit =async(e)=>{
      if(email === '' ||password === ''){
        alert("Give a Valid Data")
      }
      try{
        const response = await axios.get('http://localhost:3001/admin/find-admin', {
            params: { email, password } 
        });
        setAdminInfo(response.data)
        console.log(adminInfo)
        if(response.data.data == null){
          alert("User not Found!")
        }
        else
        {
          localStorage.setItem('userId', response.data.data._id);
          localStorage.setItem('login-type','admin')
            navigate('/admin/all-appointment')
        }

    }
    catch(error){
        console.log(error)
    }

    }

  return (
    <div className="admin-form-wrapper">
      <div className="admin-form-container">
        <p className="admin-form-title">ADMIN LOGIN</p>
        <div className="admin-form-fields">
          <input
            className="admin-input"
            type="email"
            placeholder="Enter Email?"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="admin-input"
            type="password"
            placeholder="Enter Password?"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={submit} className="admin-form-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
