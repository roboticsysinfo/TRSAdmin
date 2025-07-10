import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// 🔁 Async Thunks

export const createCategory = createAsyncThunk(
  'category/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post('/create-category', payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Create failed');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/categories');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Fetch failed');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'category/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/category/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Fetch by ID failed');
    }
  }
);


export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/update/category/${id}`, { name });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Update failed');
    }
  }
);


export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete/category/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Delete failed');
    }
  }
);

// 🧩 Initial State
const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

// 🧠 Slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ⛳️ Exports
export const { clearSelectedCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;
