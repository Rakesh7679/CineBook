import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Sample Note",
      description: "This is a sample note description.",
    },
    {
      title: "Another Note",
      description: "This is another sample note description.",
    },
    {
      title: "Third Note",
      description: "This is the third sample note description.",
    },
  ]);

  function submitHandeler(e){
    e.preventDefault();
    const form = e.target;
    const {title,description} = e.target.elements;
    // console.log(title.value, description.value);

    // Create a new note
    axios.post("http://localhost:3000/notes",{title: title.value, description: description.value})
    .then((res)=>{
      console.log(res.data);
      form.reset();
      fetchNotes();
        
    })
  }

  function deleteNote(noteId){
     //Delete a note
    axios.delete("http://localhost:3000/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
  }

  function updateNote(note){
    // Backend expects PUT with both title and description
    axios.put("http://localhost:3000/notes/" + note._id, {
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
    axios.get("http://localhost:3000/notes")
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
