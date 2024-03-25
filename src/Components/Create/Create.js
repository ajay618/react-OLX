import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/context';
import { FirebaseContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Input validations
    if (!name || !category || !price || !image) {
      alert('Please fill in all fields');
      return;
    }

    // Check if user is empty
    if (!user) {
      alert('User not logged in. Please log in to submit.');
      return;
    }

    const storageRef = firebase.storage().ref(`/images/${image.name}`);
    storageRef
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        firebase
          .firestore()
          .collection('products')
          .add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          })
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            console.error('Error adding product:', error);
            alert('An error occurred. Please try again later.');
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter product category"
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
        />
        <br />
        <br />
        <img
          alt="Product"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
