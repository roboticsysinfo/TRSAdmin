import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../services/api";


// 🔄 Create Blog
export const createBlog = createAsyncThunk("blog/createBlog", async (formData, { rejectWithValue }) => {
    try {
        const res = await api.post(`/create-blog`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success(res.data.message);
        return res.data.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to create blog");
        return rejectWithValue(err.response?.data);
    }
});


// 📥 Get All Blogs with pagination and search
export const fetchBlogs = createAsyncThunk(
    "blog/fetchBlogs",
    async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `/get-all-blogs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
            );
            return {
                blogs: res.data.data,
                pagination: res.data.pagination,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// 📥 Get Single Blog
export const getBlogById = createAsyncThunk("blog/getBlogById", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/single/blog/${id}`);
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data);
    }
});


// 📝 Update Blog
export const updateBlog = createAsyncThunk("blog/updateBlog", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/update/blog/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success(res.data.message);
        return res.data.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update blog");
        return rejectWithValue(err.response?.data);
    }
});


// ❌ Delete Blog
export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/delete/blog${id}`);
        toast.success(res.data.message);
        return id;
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete blog");
        return rejectWithValue(err.response?.data);
    }
});


// 🔧 Slice
const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        blog: null,
        loading: false,
        error: null,
        pagination: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
        },
    },
    reducers: {
        clearBlogState: (state) => {
            state.blog = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder

            // Create Blog
            .addCase(createBlog.pending, (state) => { state.loading = true; })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch All Blogs
            // Fetch All Blogs (with pagination)
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.blogs;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Blog by ID
            .addCase(getBlogById.pending, (state) => { state.loading = true; })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.blog = action.payload;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Blog
            .addCase(updateBlog.pending, (state) => { state.loading = true; })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.blogs.findIndex(b => b._id === action.payload._id);
                if (index !== -1) state.blogs[index] = action.payload;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Blog
            .addCase(deleteBlog.pending, (state) => { state.loading = true; })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearBlogState } = blogSlice.actions;
export default blogSlice.reducer;
