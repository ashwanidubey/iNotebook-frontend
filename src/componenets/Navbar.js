import React from 'react'
import {  Link , useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
  const navigate=useNavigate();
  let location = useLocation();
  const handleLogout=()=>{
    
    if( localStorage.getItem("token") )
    {
      localStorage.removeItem("token")
      localStorage.setItem("username","iNotebook")
      navigate('/login') 
    }
    else{

    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div className="container-fluid">
 <Link className="navbar-brand" to="#">{localStorage.getItem("username")}</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          
         
          <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link>
          </li>
          </ul>
          { 
        localStorage.getItem("token")?  <>
        <button onClick={handleLogout}>Logout</button>
        </>:
        <form className="d-flex" role="search">
        <Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary" to="/signup" role="button">Signup</Link> 
        </form>
        }
      </div>
    </div>
  </nav>
  )
}
