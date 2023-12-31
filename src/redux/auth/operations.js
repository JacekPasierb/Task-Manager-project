import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from 'notiflix';

axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/users/signup`, credentials);
      Notiflix.Notify.success("Register Success");
      return response.data;
    } catch (e) {
      Notiflix.Notify.failure("Register Failed");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);

      setAuthHeader(response.data.token);
      Notiflix.Notify.success('Login Success');
      return response.data;
    } catch (e) {
      Notiflix.Notify.failure("Login Failed");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    Notiflix.Notify.success("Logut Success");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    Notiflix.Notify.failure("Logout Failed");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/me");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
