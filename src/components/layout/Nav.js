import style from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const Nav = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/auth");
  };

  return (
    <nav className={style.nav}>
      <p className={style.logo}>keep notes</p>

     
        {!authCtx.isLoggedIn && 
      
            <NavLink className={style.btn} to="/auth">sing up</NavLink>
    
    }
        {authCtx.isLoggedIn && 
          
            <button className={style.btn} onClick={logoutHandler}>logout</button>
       
        }
    
    </nav>
  );
};

export default Nav;
