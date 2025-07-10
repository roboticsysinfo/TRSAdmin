// redux/slices/siteDetailSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


// Thunks

export const fetchSiteDetail = createAsyncThunk(
  'siteDetail/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/get-site-details`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
);

export const updateAbout = createAsyncThunk(
  'siteDetail/updateAbout',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`/about`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const updateTerms = createAsyncThunk(
  'siteDetail/updateTerms',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`/terms`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const updatePrivacy = createAsyncThunk(
  'siteDetail/updatePrivacy',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`/privacy`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const updateFooter = createAsyncThunk(
  'siteDetail/updateFooter',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`/footer`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const addSocialMedia = createAsyncThunk(
  'siteDetail/addSocialMedia',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(`/social-media`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Add failed');
    }
  }
);

export const deleteSocialMedia = createAsyncThunk(
  'siteDetail/deleteSocialMedia',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/social-media/${id}`);
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

// Slice

const siteDetailSlice = createSlice({
  name: 'siteDetail',
  initialState: {
    data: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSiteMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟢 Always declare .addCase FIRST
      .addCase(fetchSiteDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSiteDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addSocialMedia.fulfilled, (state, action) => {
        state.data.socialMedia = action.payload.socialMedia;
        state.successMessage = action.payload.message;
      })
      .addCase(addSocialMedia.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteSocialMedia.fulfilled, (state, action) => {
        state.data.socialMedia = state.data.socialMedia.filter(
          (item) => item._id !== action.payload.id
        );
        state.successMessage = action.payload.message;
      })
      .addCase(deleteSocialMedia.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔵 Then declare .addMatcher AFTER .addCase
      .addMatcher(
        (action) =>
          [
            updateAbout.fulfilled,
            updateTerms.fulfilled,
            updatePrivacy.fulfilled,
            updateFooter.fulfilled,
          ].includes(action.type),
        (state, action) => {
          state.successMessage = action.payload.message;
        }
      )
      .addMatcher(
        (action) =>
          [
            updateAbout.rejected,
            updateTerms.rejected,
            updatePrivacy.rejected,
            updateFooter.rejected,
          ].includes(action.type),
        (state, action) => {
          state.error = action.payload;
        }
      );
  }


});

export const { clearSiteMessage } = siteDetailSlice.actions;

export default siteDetailSlice.reducer;
