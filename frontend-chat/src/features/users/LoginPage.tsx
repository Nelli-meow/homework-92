import { useState } from 'react';
import * as React from 'react';
import { LoginMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, login } from './usersThunk.ts';
import { GoogleLogin } from '@react-oauth/google';


const initialState = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const [form, setForm] = useState<LoginMutation>({...initialState});
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(login(form)).unwrap();

    navigate('/');
    setForm(initialState);
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-center mb-5">Sign In</h3>

          <div className="mb-4 w-full flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => alert('Login failed')}
            />
          </div>

          {loginError && (
            <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-3">
              {loginError.error}
            </div>
          )}

          <div className="mb-4 w-full">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={inputChange}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={inputChange}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
          </div>

          <button type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>

          <p className="text-center mt-3">
            <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Sign up</Link>
          </p>
        </form>
      </div>

    </>

  );
};

export default LoginPage;