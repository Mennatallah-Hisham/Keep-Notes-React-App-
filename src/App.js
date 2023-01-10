
import './App.css';
import Nav from './components/layout/Nav';
import NoteForm from './components/notes/NoteForm';
import AuthContextProvider from './context/authContextProvider';
import AuthForm from './components/auth/AuthForm'
import NoteList from './components/notes/NoteList';
import {Route,Switch,Redirect }from 'react-router-dom';
import { useContext } from 'react'; 
import AuthContext from './context/authContext';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
function App() {
  const authCTX=useContext(AuthContext);

  return (
    <AuthContextProvider>

<Nav/>

    

<Switch>

<Route path="/" exact>
  <HomePage/>
</Route>
  <Route path ="/auth" exact>
  <AuthForm/>
  </Route>


{!authCTX.isLoggedIn &&  <Route path="/notes" exact>
     <NoteList/>
     </Route>}
{!authCTX.isLoggedIn &&  
  <Route path="/addNote" exact>
    <NoteForm/>
  </Route>}
     

   <Route path="*">
    <NotFound/>
   </Route>



</Switch>


    </AuthContextProvider>
  

  );
}

export default App;
