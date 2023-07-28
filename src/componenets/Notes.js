import React, { useContext, useEffect } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/noteContext'
export default function Notes() {
  const a =useContext(NoteContext)  ;
  useEffect(()=>{
       a.fetchNotes();
  },[])
  return (
    <div className="row">
    {
    a.notes && a.notes.length>0?a.notes.map((key,index)=>{
    return <NoteItem  key={index} note={a.notes[index]} />}
    ) :<>nothing to show</>
    }
    </div>
  )
}
