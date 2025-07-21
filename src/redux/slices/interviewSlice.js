// src/redux/slices/interviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../services/api';


// ------------------- Async Thunks -------------------

// Get all interviews
export const fetchInterviews = createAsyncThunk(
    'interviews/fetchAll',
    async ({ page = 1, limit = 10, search = '' } = {}, { rejectWithValue }) => {
        try {
            const res = await api.get(`/all-interviews`, {
                params: { page, limit, search }
            });
            return res.data.data; // includes: interviews, currentPage, totalPages, totalItems
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch interviews');
        }
    }
);



// Get single interview
export const fetchInterviewById = createAsyncThunk(
    'interviews/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/single-interview/${id}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch interview');
        }
    }
);


// Add interview
export const addInterview = createAsyncThunk(
    'interviews/add',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post(`/add-interview`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Interview added');
            return res.data.data;
        } catch (err) {
            toast.error('Failed to add interview');
            return rejectWithValue(err.response?.data?.message || 'Failed to add interview');
        }
    }
);


// Update interview
export const updateInterview = createAsyncThunk(
    'interviews/update',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/update/interview/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Interview updated');
            return res.data.data;
        } catch (err) {
            toast.error('Failed to update interview');
            return rejectWithValue(err.response?.data?.message || 'Failed to update interview');
        }
    }
);


// Delete interview
export const deleteInterview = createAsyncThunk(
    'interviews/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/delete/interview/${id}`);
            toast.success('Interview deleted');
            return id;
        } catch (err) {
            toast.error('Failed to delete interview');
            return rejectWithValue(err.response?.data?.message || 'Failed to delete interview');
        }
    }
);

// ------------------- Slice -------------------

const interviewSlice = createSlice({
    name: 'interviews',
    initialState: {
        all: [],
        selected: null,
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
        }
    },
    reducers: {
        clearSelectedInterview: (state) => {
            state.selected = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInterviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInterviews.fulfilled, (state, action) => {
                state.loading = false;
                state.all = action.payload.interviews;
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    totalItems: action.payload.totalItems
                };
            })
            .addCase(fetchInterviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchInterviewById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInterviewById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload;
            })
            .addCase(fetchInterviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addInterview.fulfilled, (state, action) => {
                state.all.unshift(action.payload);
            })

            .addCase(updateInterview.fulfilled, (state, action) => {
                const index = state.all.findIndex(i => i._id === action.payload._id);
                if (index !== -1) state.all[index] = action.payload;
            })

            .addCase(deleteInterview.fulfilled, (state, action) => {
                state.all = state.all.filter(i => i._id !== action.payload);
            });
    }
});

export const { clearSelectedInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
