import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


// 📥 Signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/admin-register', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);


// 🔐 Login by email
export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/admin-login', formData);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);



// 🧠 Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    otp: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otp = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      // ✅ Add this for Redux Persist rehydration support
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  },
  extraReducers: builder => {
    builder
      // Signup
      .addCase(signupUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginWithEmail.pending, state => { state.loading = true; state.error = null; })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.data.token;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
});

export const { logout, clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
