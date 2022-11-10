import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Header from './Header';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
      setAlert('User created', 'success');
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
  return (
    <Fragment >
      <Header   heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="SignIn"
                linkUrl="/login" />
      
      <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e)}>
        <div className="-space-y-px ">
          <div className='my-5'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              required
              onChange={(e) => onChange(e)}
              className = {fixedInputClass}

            />
          </div>
          <div className='my-5'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              required
              onChange={(e) => onChange(e)}
              className = {fixedInputClass}

            />
            
          </div>
          <div className='my-5'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              required
              onChange={(e) => onChange(e)}
              className = {fixedInputClass}

            />
          </div>
          <div className='my-5'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              required
              onChange={(e) => onChange(e)}
              className = {fixedInputClass}

            />
          </div>
        </div>
      <>
        {
            <button
                type='submit'
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                value= 'Register'
            > SignUp</button>
        }
      </>
      </form>
     
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
