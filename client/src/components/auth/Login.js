import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Header from './Header';

// const navigate = useNavigate();
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    console.log(isAuthenticated);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

  return (
    <div  class="container mx-auto">
      <Header   heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/register" />
      <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e)}>
      <div className="-space-y-px">
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
            className = {fixedInputClass}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>

      {/* //Button */}
      <>
        {
            <button
                type='submit'
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                value= 'Login /'
            > Login</button>
        }
      </>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
