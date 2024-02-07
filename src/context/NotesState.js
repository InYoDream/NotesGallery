import react,{useState} from "react";
import NotesContext from "./NotesContext";



const NoteState = (props)=>{
    // const s1 ={
    //     "name":"Abhishek",
    //     "year":"3rd"
    // }
    const host = "http://localhost:8000"

    const notesini = [];
    const [notes,setNotes] = useState(notesini);

    //get all notes

    const allNotes =async()=>{
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET", 
            headers:{
                'Content-Type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZmM4YzczYTJkYWI5ZjIxZDYyNDk3In0sImlhdCI6MTcwNjAxOTAxNX0.FL2Db7uy-aZCwwfz1bTByIFOEVZOwYv5C4dGiIc4bIo'
            },
          });
          const json = await response.json();
          console.log(json);
          setNotes(json);
    }


    //Adding a note
    const addNote = async(title,description,tag) => {


        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST", 
            headers:{
                'Content-Type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZmM4YzczYTJkYWI5ZjIxZDYyNDk3In0sImlhdCI6MTcwNjAxOTAxNX0.FL2Db7uy-aZCwwfz1bTByIFOEVZOwYv5C4dGiIc4bIo'
            },
            body: JSON.stringify({title,description,tag})
          });


         const note ={
            "title": title,
            "description": description,
            "tag": tag,
          };
        setNotes(notes.concat(note));
    }

    //deleting a note
    const deleteNote =async (id)=>{

        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE", 
            headers:{
                'Content-Type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZmM4YzczYTJkYWI5ZjIxZDYyNDk3In0sImlhdCI6MTcwNjAxOTAxNX0.FL2Db7uy-aZCwwfz1bTByIFOEVZOwYv5C4dGiIc4bIo'
            },
          });

        console.log('Deleting note with id'+id);
        const newNotes = notes.filter((note)=>{return notes._id!==id});
        setNotes(newNotes);
    }

    const editNote= async(id,title,description,tag)=>{

        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "POST", 
            headers:{
                'Content-Type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZmM4YzczYTJkYWI5ZjIxZDYyNDk3In0sImlhdCI6MTcwNjAxOTAxNX0.FL2Db7uy-aZCwwfz1bTByIFOEVZOwYv5C4dGiIc4bIo'
            },
            body: JSON.stringify({title,description,tag})
          });
          const json =  response.json();

        for(let i=0;i<notes.length();i++){
            const el = notes[i];
            if(el._id===id){
                el.title = title;
                el.description = description;
                el.tag = tag;
            }
        }
    }

    return (
        <NotesContext.Provider value={{notes,addNote,deleteNote,allNotes,editNote}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState ;




