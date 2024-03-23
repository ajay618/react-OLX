import React ,{useEffect , useContext } from 'react';
import './App.css';
import {BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/context';
import Post from './store/PostContext'
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
    <Post>
      <Router>
        <Routes>
         
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} /> 
          <Route path='/view' element={<View />} />  
          
        </Routes>
      </Router>
    </Post>    
    </div>
  );
}

export default App;
