import React, { useEffect, useContext } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import NoteContext from '../context/notes/noteContext'
export default function NoteItem({ note }) {
  const a = useContext(NoteContext);
  const handleEdit = (event) => {
    event.preventDefault();
    const b = document.getElementById("mymodal");
    a.SetEditable(note);
    
    b.click();
  }
  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await a.deleteNote(note._id);
    if (response.response.success) {
      a.ShowAlert(response.response.message, "success")
    }
    else {
      a.ShowAlert("internal issue , try again", "danger")
    }

  }

  return (
    <div className="card my-3 mx-3" style={{ "width": "18rem" }}>
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className="card-title">{note.title}</h5>
          <div>
            <AiOutlineEdit className='mx-2' style={{ cursor: "pointer" }} onClick={handleEdit} />
            <AiOutlineDelete style={{ cursor: "pointer" }} onClick={handleDelete} />
          </div>
        </div>

        <h6 className="card-subtitle mb-2 text-muted" >{note.tag}</h6>
        <p className="card-text">{note.body}</p>

      </div>
    </div>
  )
}
