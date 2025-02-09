import { GlobalError, IUser, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { googleLogin, login, register } from './usersThunk.ts';

interface UsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginError: GlobalError | null;
  loginLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  registerError: null,
  registerLoading: false,
  loginError: null,
  loginLoading: false
};

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, {payload: userResponse}) => {
        state.registerLoading = true;
        state.user = userResponse.user;
      })
      .addCase(register.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      })
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, {payload: user}) => {
        state.loginLoading = true;
        state.user = user;
      })
      .addCase(login.rejected, (state, {payload: error}) => {
        state.loginLoading = false;
        state.loginError = error || null;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(googleLogin.fulfilled, (state, {payload: user}) => {
        state.loginLoading = true;
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, {payload: error}) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;