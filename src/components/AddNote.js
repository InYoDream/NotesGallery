import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";

const AddNote = () => {
  const context = useContext(NotesContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onClick=(e)=>{
    e.preventDefault();
    addNote(note.title , note.description ,note.tag);
  }


  return (
    <div className="container my-3">
      <div>Title</div>
      <input
        className="form-control form-control-lg"
        name="title"
        type="text"
        placeholder="Enter title"
        onChange={onChange}
      />
      <div>Description</div>
      <input
        className="form-control"
        name="description"
        type="text"
        placeholder="Enter description"
        onChange={onChange}
      />
      <div>Tag</div>
      <input
        className="form-control form-control-sm"
        name="tag"
        type="text"
        placeholder="Enter tag"
        onChange={onChange}
      />
      <button type="button" className="btn btn-info" onClick={onClick}>
        Save
      </button>{" "}
    </div>
  );
};

export default AddNote;
