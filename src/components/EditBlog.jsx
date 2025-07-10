import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getBlogById,
    updateBlog,
    clearBlogState,
} from "../redux/slices/blogSlice";
import { fetchCategories } from "../redux/slices/categorySlice";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { blog, loading } = useSelector((state) => state.blog);
    const { categories } = useSelector((state) => state.categories);

    const [form, setForm] = useState({
        title: "",
        description: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        blogImageAlt: "",
        category: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        dispatch(getBlogById(id));
        dispatch(fetchCategories());
        return () => dispatch(clearBlogState());
    }, [id, dispatch]);

    useEffect(() => {
        if (blog) {
            setForm({
                title: blog.title,
                description: blog.description,
                metaTitle: blog.metaTitle || "",
                metaDescription: blog.metaDescription || "",
                metaKeywords: blog.metaKeywords || "",
                blogImageAlt: blog.blogImageAlt || "",
                category: blog.category?._id || "",
            });
            setPreview(blog.blogImage);
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in form) formData.append(key, form[key]);
        if (image) formData.append("blogImage", image);

        dispatch(updateBlog({ id, formData })).then((res) => {
            if (!res.error) navigate("/blogs-list");
        });
    };

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header bg-danger"><h6 className="mb-0 text-white">Edit Blog</h6></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Meta Title</label>
                            <input type="text" name="metaTitle" value={form.metaTitle} onChange={handleChange} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Meta Description</label>
                            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} className="form-control" rows="2"></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Meta Keywords</label>
                            <input type="text" name="metaKeywords" value={form.metaKeywords} onChange={handleChange} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Blog Image</label>
                            <input type="file" onChange={handleImage} accept="image/*" className="form-control" />
                            {preview && <img src={preview} alt="preview" className="mt-2" width="120" />}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image Alt Text</label>
                            <input type="text" name="blogImageAlt" value={form.blogImageAlt} onChange={handleChange} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select name="category" value={form.category} onChange={handleChange} className="form-select" required>
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <ReactQuill
                                theme="snow"
                                value={form.description}
                                onChange={(val) => setForm((prev) => ({ ...prev, description: val }))}
                            />
                        </div>

                        <button className="btn btn-danger" type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Blog"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
