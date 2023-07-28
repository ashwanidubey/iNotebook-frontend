import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import {useNavigate} from 'react-router-dom';

    
export default function Signup() {
    const a =useContext(NoteContext) ;
    const navigate = useNavigate();
    const [userDetails,setUserDetails]=useState({firstname:"",lastname:"", email:"", password:"",confirmpassword:""});
   
    const onchange=(event)=>{
        setUserDetails({...userDetails,[event.target.name]:event.target.value})  
        
    }

    const handleSubmitt=async(event)=>{

        event.preventDefault();
       
        const user={
            "name": userDetails.firstname+userDetails.lastname,
            "email":userDetails.email,
            "password":userDetails.password
          }
       
        const response=await a.signUp({...user});
        if(response.success==true || response.response.success)
        {
            setUserDetails({firstname:"",lastname:"", email:"", password:"",confirmpassword:""})
            const token=response.response.token?response.response.token:response.token;
            localStorage.setItem('token',token)
            navigate('/');
        }
        else
        {
         alert("wrong input")
        }
      }   


    return (
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">First Name</label>
                <input type="text" class="form-control" name="firstname" id="firstname" onChange={onchange}/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Last Name</label>
                <input type="text" class="form-control" name="lastname" id="lastname" onChange={onchange} />
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control"  name="email" id="email" onChange={onchange}/>
            </div>
            <div class="col-md-6">
            </div>

            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" id="password" onChange={onchange}/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" name="confirmpassword" id="confirmpassword" onChange={onchange} />
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary" onClick={handleSubmitt}>Sign in</button>
            </div>
        </form>
    )
}
