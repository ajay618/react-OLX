import React , { useState , useEffect , useContext }from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/context';
import { PostContext } from '../../store/PostContext';
import { AuthContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';
function Posts() {

const {firebase} = useContext(FirebaseContext)
const { user } = useContext(AuthContext)
const [products , setProducts] = useState([])
const {setpostDetails} = useContext(PostContext)
const navigate = useNavigate();


useEffect(() => {
  if (user && user.uid) { 
    firebase
      .firestore()
      .collection('products')
      .where('userId', '==', user.uid)
      .get()
      .then((snapshot) => {
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        
        setProducts(allPost);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
}, [firebase, user]); 


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {products.length === 0 ? (
          <div className="no-products">
             <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
            </div>
          </div>
        ) : products.map( (product , index) => {
          return   <div key={index} className="card" onClick={ () => {
                    setpostDetails(product);
                    navigate('/view');
                  }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                <img src={product.url} alt="" />
                </div>
                <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
                </div>
                <div className="date">
                <span>{product.createdAt}</span>
                </div>
                </div>
      })
      }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
