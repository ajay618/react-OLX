import React, { Fragment, useState ,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/context';
import { FirebaseContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const[name , setName] = useState('')
  const[category , setCategory] = useState('')
  const[price , setPrice] = useState('')
  const[image , setImage] = useState(null)
  const date = new Date();
  const navigate = useNavigate();
  const handleSubmit = () =>{
    const storageRef = firebase.storage().ref(`/images/${image.name}`);
    storageRef.put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        firebase.firestore().collection('products').add( {
          name,
          category,
          price,
          url,
          userId : user.uid,
          createdAt  : date.toDateString()
        })
        navigate('/');
      })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter your category"
          />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
          <input
            className="input"
            type="number"
            id="price"
            name="catpriceegory"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter your category"
          />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={ image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input  onChange={(e) => {
                setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
