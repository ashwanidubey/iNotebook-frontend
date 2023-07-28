import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const a =useContext(NoteContext) ;
    const [credential,setcredential]=useState({email:"", password:""});
    const navigate = useNavigate();
    const handleChange=(event)=>{
      setcredential({...credential,[event.target.name]:event.target.value});
    }
    
    const handleSubmitt=async(event)=>{
        event.preventDefault();
        console.log(credential)
        const response=await a.Login(credential);
        if(response.success===true || response.response.success)
        {
          const token=response.response.token;
          //fetchUserName
          localStorage.setItem('token',token)
          setcredential({email:"", password:""})
          
          navigate('/');
        }
        else
        {
         alert("wrong input")
        }
      }    
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmitt}>Submit</button>
        </form>
    )
}
