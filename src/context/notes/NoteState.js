import NoteContext from "./noteContext";
import React, { useEffect, useState } from 'react'


export default function NoteState(props) {

    const host = process.env.REACT_APP_HOST
    const enote = { "title": "", "user": "", "body": "", "tag": "", "_id": "" }
    const [notes, setNotes] = useState([]);
    const [editable, setEditable] = useState(enote);
    const [showAlert, setShowAlert] = useState({ "show": false, "message": "default", "type": "danger" });
   
   
    //to fetch nodes
    const fetchNotes = async () => {
        try {
            
            const url = `${host}/v1/note/view`
            var response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
            });
            response = await response.json()
            setNotes(response.note)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    // to add note
    const addNote = async (note) => {
        var tnote = {

            "title": note.title,
            "body": note.body,
            "tag": note.tag

        };
        try {

            const url = `${host}/v1/note/create`
            const token = localStorage.getItem("token");
            var response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify(tnote)
            });
            response = await response.json()
            fetchNotes();
            return { result: true, response: response }
        } catch (error) {
            console.error('Error fetching data:', error);
            return { result: false }
        }

    }


    // edit notes
    const editNote = async (id, title, description, tag) => {
        for (let index = 0; index < notes.length; index++) {
            if (id === notes[index]._id) {
                notes[index].title = title;
                notes[index].body = description;
                notes[index].tag = tag;

                //update in db
                try {
                    const url = `${host}/v1/note/update/${id}`
                    var response = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "token": localStorage.getItem("token")
                        },
                        body: JSON.stringify(notes[index])
                    });
                    response = await response.json()

                    return { result: true, response: response }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    return { result: false }
                }
            }
        }
        fetchNotes();
        return { result: false }

    }



    //delete notes
    const deleteNote = async (id) => {
       // const newnotes = notes.filter((note) => note._id != id)
        try {
            const url = `${host}/v1/note/delete/${id}`
            var response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
            });
            response = await response.json()
            fetchNotes();
            setEditable(enote);
            return { result: true, response: response }
        } catch (error) {
            console.error('Error fetching data:', error);
            return { result: false }
        }

    }
    // login
    const Login = async (credential) => {

        const logincreds = {
            "email": credential.email,
            "password": credential.password
        }

        try {
            const url = `${host}/v1/auth/login`
            console.log("url"+url)
            var response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logincreds)
            });
            response = await response.json()
            if (response.success === undefined) {
                response.success = false;
            }
            else
            {

                const userurl = `${host}/v1/auth/fetchuser`
            var userresponse = await fetch(userurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": response.token
                }
            });
            userresponse = await userresponse.json()
                localStorage.setItem('username',userresponse.user.name)
            }
            await fetchNotes();
            return { response }
        } catch (error) {
            console.error('Error in login:', error);
            return { result: false }
        }
    }

    //signup
    const signUp = async ({ name, email, password }) => {
        try {
            const userdata = { name, email, password }
            const url = `${host}/v1/auth/create`
            var response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userdata)
            });
            response = await response.json()
            if (response.success === undefined) {
                response.success = false;
            }
            else
            {
                console.log("my response")
                console.log(response)
                const userurl = `${host}/v1/auth/fetchuser`
            var userresponse = await fetch(userurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": response.token
                }
            });
            userresponse = await userresponse.json()
            console.log(userresponse)
            console.log("userresponse")
                localStorage.setItem('username',userresponse.user.name)
            }
            fetchNotes();
            return { response }
        } catch (error) {
            console.error('Error in login:', error);
            return { result: false }
        }
    }


    const ShowAlert = (message, type) => {
        setShowAlert({ "show": true, "message": message, "type": type })
        setTimeout(
            () => {
                setShowAlert({ "show": false, "message": "default", "type": "default" });
            }, 2000);
    }
    const SetEditable = (note) => {  
        setEditable(note);
    }



    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, editable, SetEditable, Login, signUp, ShowAlert, showAlert, fetchNotes  }}>
            {props.children}
        </NoteContext.Provider>
    )
}
