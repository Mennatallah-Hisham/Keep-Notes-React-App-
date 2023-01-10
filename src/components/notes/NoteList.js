import { useEffect, useState } from "react";

import style from "./NoteList.module.css"
import NoteItem from "./NoteItems";
import { Link } from "react-router-dom";

const NoteList= ()=>{
    const [notes,setNotes]=useState([]);
    const getNotes =async ()=>{
        try{
            
        const reponse = await fetch("https://keep-note-f2323-default-rtdb.firebaseio.com/notes.json");

        if(!reponse.ok){
            throw new Error("couldn't fetch data");
        }
        const data = await reponse.json();
    
   let dataTransform = [];
     for(const key in data){
        dataTransform.push({...data[key]})
      }
 setNotes(dataTransform);

        }catch(e){



        }


    }
    const clearHandler =async()=>{


    
            try{
                const request = await fetch(`https://keep-note-f2323-default-rtdb.firebaseio.com/notes.json?`,{
                    method:'DELETE'
                })
                if(!request.ok){
                    throw new Error("failed to delete");
                }
                getNotes();
         
    
            }catch(e){
                console.log(e)
            }
    
        
    };
    
    useEffect(()=>{
        getNotes();
    },[])

    return (
        <div className={style.container}>
         
           

            {notes.length ===0 &&<div>
                <p className={style.msg}>no notes found</p>
                <Link to="/addNote">

                <button className={style.btn}>add  note</button>
                </Link>
                
              </div> }
            {notes.length>0 &&
            <div className={style.NoteContainer}>
                   <div className={style.btns}>
            <button onClick={clearHandler} className={style.btn}>clear all</button>
            <Link to="/addNote">

<button className={style.btn}>add  note</button>
</Link>
            </div>
                {
                     notes.map(
                        (note)=>{return( <NoteItem key={note.id} id={note.id} title={note.title} body={note.body}/>)})
                }
                </div>

            
          
            }
        </div>
    )


}

export default NoteList;