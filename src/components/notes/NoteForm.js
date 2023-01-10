
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import style from './NoteForm.module.css';

const NoteForm =()=>{
    const titleRef =useRef();
    const bodyRef= useRef();
const history=useHistory();


    const addNotehandler=async(e)=>{
        e.preventDefault();
        let random =Math.floor(Math.random()*10);
     const data={
            title:titleRef.current.value,
            body:bodyRef.current.value,
            id:`${random}${titleRef.current.value}`,

        }
        try{
            const request =await fetch("https://keep-note-f2323-default-rtdb.firebaseio.com/notes.json",{
                method:'POST',
                body:JSON.stringify(data),
            })
            if(!request.ok){
                throw new Error("failed to add your note")
            }

            history.push('/notes');

        }catch(e){

        }
       
       
    }
    return(<div>
        <form onSubmit={addNotehandler} className={style.form}>
        <h1 className={style.heading}> add new note</h1>
            <div>
            <label htmlFor="title">title</label>
            <input id="title" type="text"ref={titleRef} required/>
            </div>
            <div>
            <label htmlFor="note">body</label>
            <textarea id="note" ref={bodyRef}></textarea>
            </div>
            <button className={style.btn}> add note</button>
        </form>

    </div>)
}

export default NoteForm;