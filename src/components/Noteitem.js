import React , {useContext} from "react";
import NotesContext from "../context/NotesContext";

const Noteitem = (props) => {

  const context = useContext(NotesContext);
  const {deleteNote} = context;
    const {note} = props;
  return (
    <div className="col-md-4">
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title fw-semibold text-decoration-underline">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fa-solid fa-pen-to-square mx-2"></i>
          <i className="fa-solid fa-trash-can mx-4" onClick={()=>{deleteNote(note._id)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
