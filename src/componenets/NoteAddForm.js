import React , { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
export default function NoteAddForm() {
  const a =useContext(NoteContext) ;
  const [isDisable,setDisable]=useState(true);
  const [value,setValue]=useState({title:"", body:"",tag:""});
  
  const handleChange=(event)=>{
    setValue({...value,[event.target.name]:event.target.value});
    setDisable(value.title.length<=3 || value.body.length<=3 ||  value.tag.length<2)
    console.log(value)
    
  }
  const handleSubmitt=async(event)=>{
  
    event.preventDefault();
    const response=await a.addNote(value);
   
    if(response.result==true)
    {
      setValue({
        title:"", 
        body:"",
        tag:""
       })
       document.getElementById("myForm").reset();
       a.ShowAlert("note added", "success");
       
    }
    else
    {
    }
  }
  return (
    <form className='my-5' id="myForm">
      <h3>Add a note</h3>
    <div className="row mb-3">
      <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="title"  onChange={handleChange}  defaultValue={value.title} name="title" required/>
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="description" onChange={handleChange} defaultValue={value.body} name="body" required/>
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="tag" onChange={handleChange} name="tag" defaultValue={value.tag} required/>
      </div>
    </div>
 
    <button disabled={isDisable} type="submit" className="btn btn-primary" onClick={handleSubmitt}>Add</button>
  </form>
  )
}
