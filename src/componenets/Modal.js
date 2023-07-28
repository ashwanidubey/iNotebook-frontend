import React , { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

export default function Modal() {

    const context =useContext(NoteContext) ;
    const [value,setValue]=useState(context.editable);
    
    const handleChange=(event)=>{
    context.SetEditable({...context.editable,[event.target.name]:event.target.value})
    }

    const handleSubmitt=async(event)=>{
  
      event.preventDefault(); 
      const response=await context.editNote(context.editable._id, context.editable.title, context.editable.body, context.editable.tag) 
       if((response &&  response.success) || (response && response.response && response.response.success))
         {
          document.getElementById("mymodal").click();
          setTimeout(()=>{
            context.ShowAlert("note updated", "success") 
          },10)
           
        }
      else
        { setValue(value);
          document.getElementById("mymodal").click();
          context.ShowAlert(response.response?response.response.message:response.message, "danger") 
        }
    }
   
  return (
    <>
    <button type="button" id="mymodal" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden >Launch</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-5'>
      
    <div className="row mb-3">
      <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="title"   name="title" value={context.editable.title} onChange={handleChange}/>
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="body"  name="body"  value={context.editable.body} onChange={handleChange}/>
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="tag"  name="tag" value={context.editable.tag} onChange={handleChange}/>
      </div>
    </div>
 
  </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmitt}>Save changes</button>
      </div>
    </div>
  </div>
</div>
</>
  )
}
