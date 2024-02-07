import React , {useContext , useEffect} from "react";
import NotesContext from "../context/NotesContext";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, addNote , allNotes } = context;

  useEffect(()=>{
    allNotes()
  },[])

  return (
    <div className="row my-3">
      {notes.map(note => {
        return <Noteitem key={note._id} note={note} />
      })}
    </div>
  );
};

export default Notes;

