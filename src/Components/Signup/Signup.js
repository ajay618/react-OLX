import React, { useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useForm } from 'react-hook-form';
import { FirebaseContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      await result.user.updateProfile({ displayName: data.username });
      await firebase.firestore().collection('users').add({
        id: result.user.uid,
        username: data.username,
        phone: data.phone
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            {...register('username', { 
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters long' }
            })}
          />
          {errors.username && <div className="error">{errors.username.message}</div>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            {...register('phone', { 
              required: 'Phone is required',
              minLength: { value: 10, message: 'Phone number must be exactly 10 digits' },
              maxLength: { value: 10, message: 'Phone number must be exactly 10 digits' }
            })}
          />
          {errors.phone && <div className="error">{errors.phone.message}</div>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: '8 characters(1 (!@#$%^&*) & 1 no)'
              }
            })}
          />
          {errors.password && <div className="error">{errors.password.message}</div>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
