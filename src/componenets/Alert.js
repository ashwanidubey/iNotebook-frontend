import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

export default function Alert({ message }) {

  const context = useContext(NoteContext);
 

  return (
    <>{context.showAlert.show ?
      <div className={`alert alert-${context.showAlert.type}`} role="alert">
        {context.showAlert.message}
      </div>
      : <></>}
    </>
  )
}
