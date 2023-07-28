import React, { useEffect } from 'react'
import Notes from './Notes'
import NoteAddForm from './NoteAddForm'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'


export default function Home() {
 const navigate=useNavigate();
 
 useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
     navigate('/login')
    }
  },[])
  return (
 <>
 <NoteAddForm />
 <Notes/>
 <Modal />
 </>
  )
}
