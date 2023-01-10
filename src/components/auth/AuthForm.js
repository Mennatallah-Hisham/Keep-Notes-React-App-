import {useState, useRef, useContext} from 'react';
import style from "./AuthForm.module.css";
import AuthContext from '../../context/authContext';
import { useHistory } from 'react-router-dom';

const AuthForm =()=>{


const[login,setLogin]=useState(false);
const [isError, setIsError]=useState(false);
const enteredEmail = useRef();
const enteredPassword= useRef();
const authCTX =useContext(AuthContext);
const history = useHistory();

let url;
if(login){
    url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTKLnM0Y9GXWyXrXZi2xagvWrMCVp3DW0`
}else{
    url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTKLnM0Y9GXWyXrXZi2xagvWrMCVp3DW0`
}


const formHandler= async(e)=>{
    
 
    e.preventDefault();
    try{
        setIsError(false);

    
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify
        ({
            email:enteredEmail.current.value,
            password:enteredPassword.current.value,
            returnSecureToken:true
        }),

       headers:{
        'content-Type': 'application/json',
       }
    
    })

    if(!response.ok){
        throw new Error("You have entered an invalid username or password");
    
    }
    const data =await response.json();
    authCTX.login(data.idToken);
  
    history.push("./notes");

 
}catch(e){
setIsError(true);

}finally{
    enteredEmail.current.value="";
    enteredPassword.current.value="";
}
}

const switchHandler =()=>{
    setLogin((prevState)=>!prevState);
}
    return(
        <form className={style.form} onSubmit={formHandler}>
            <h1>{login? 'log in':'sign up'}</h1>
            <div>
            <label className={style.label} htmlFor="email">
                email
            </label>
            <input 
            id="email"
             type="email"
             ref={enteredEmail}
              required/>
            </div>

            <div>
            <label className={style.label} htmlFor="password">password</label>
            <input 
            id="password" 
            type="password"
             required
             ref={enteredPassword}/>

            </div>
           

          

            <button
                   className={style.btn}> {login? 'log in':'sign up'}</button>

            <button
            className={style.toggle}
             onClick={switchHandler}>
            {login? 'create new account':'Login with existing account'}
            </button>
{isError ? <p className={style.errorMsg}>You have entered an invalid username or password</p>:false}
        </form>
    )
}

export default AuthForm;