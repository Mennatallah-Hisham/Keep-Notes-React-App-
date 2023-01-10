
import style from './NoteItem.module.css';
import { useState } from 'react';


const NoteItem =(props)=>{
    const [showBody,setShowBody]=useState(false);

    const toggleBodyHandler=()=>{
        setShowBody((prev)=>!prev)

    }
  
    return(
        <div className={style.noteCard}>
           <div>
        <p className={style.title}>{props.title}</p>
      {showBody && <p className={style.body}>{props.body}</p> }
           </div>
      
         <button className={style.btn} onClick={toggleBodyHandler}>
         {showBody && <span>-</span>}
         {!showBody && <span>+</span>}
   
</button>
       
        </div>
    )
}

export default NoteItem;