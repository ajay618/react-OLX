import React ,{useEffect , useContext } from 'react';
import './App.css';
import {BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './store/context';

function App() {

  const {setUser } = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect ( () => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup />} /> 
          <Route path='/login' element={<Login />} /> 
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
