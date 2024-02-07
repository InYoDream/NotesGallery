
import React ,{useContext} from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
const Home = () => {
  
  
  return (
    <div className="container my-3">
      <AddNote/>
      <div className="container my-3">
        <h6>My Notes</h6>
        <Notes/>
      </div>
    </div>
  );
};

export default Home;
