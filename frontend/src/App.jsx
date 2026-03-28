import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function submitHandeler(e){
    e.preventDefault();
    const form = e.target;
    const {title,description} = e.target.elements;
    // console.log(title.value, description.value);

    // Create a new note
    axios.post("https://practice-backend-and-deployment.onrender.com/notes",{title: title.value, description: description.value})
    .then((res)=>{
      console.log(res.data);
      form.reset();
      fetchNotes();
        
    })
  }

  function deleteNote(noteId){
     //Delete a note
    axios.delete("https://practice-backend-and-deployment.onrender.com/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
  }

  function updateNote(note){
    // Backend expects PUT with both title and description
    axios.put("https://practice-backend-and-deployment.onrender.com/notes/" + note._id, {
      title: note.title,
      description: "Updated description",
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  // Fetch notes from the backend API
   function fetchNotes() {
    axios.get("https://practice-backend-and-deployment.onrender.com/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }
  // Create a new note

  useEffect(() => {
    fetchNotes();
  }, []);



  return (

    <>
    <div className="notes">
      <form onSubmit={submitHandeler}>
        <input type="text" name="title" placeholder="Enter Title" />
        <input type="text" name="description" placeholder="Enter Description" />
        <button>Create</button>
      </form>
      {notes.map((note) => {
        return (
          <div className="note" key={note._id || note.title}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{
              deleteNote(note._id)
            }}>Delete</button>
            <button onClick={()=>{
              updateNote(note)
            }}>Edit</button>
          </div>
        );
      })}
    </div>
    </>

      
  );
}

export default App;
