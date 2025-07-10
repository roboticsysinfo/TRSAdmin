import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../redux/slices/blogSlice";
import { fetchCategories } from "../redux/slices/categorySlice";

const CreateBlog = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.blog);
    const { categories } = useSelector((state) => state.categories);

    const [form, setForm] = useState({
        title: "",
        description: "",
        blogImageAlt: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        category: "",
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleQuillChange = (value) => {
        setForm({ ...form, description: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !form.title || !form.description || !form.category) {
            return alert("Please fill required fields including image");
        }

        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));
        formData.append("blogImage", image);

        dispatch(createBlog(formData));
    };

    return (
        
        <div className="container my-4">
            <div className="card">
                <div className="card-header bg-danger text-white">
                    <h6 className="text-white mb-0">Create Blog</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label>Title <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-xs-6 ">

                                <div className="mb-3">
                                    <label>Image <span className="text-danger">*</span></label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        required
                                    />
                                </div>

                            </div>

                            <div className="col-lg-6 col-xs-6 ">

                                <div className="mb-3">
                                    <label>Image Alt Text</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="blogImageAlt"
                                        value={form.blogImageAlt}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="mb-3">
                            <label>Meta Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="metaTitle"
                                value={form.metaTitle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Meta Description</label>
                            <textarea
                                className="form-control"
                                name="metaDescription"
                                value={form.metaDescription}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Meta Keywords</label>
                            <input
                                type="text"
                                className="form-control"
                                name="metaKeywords"
                                value={form.metaKeywords}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Category <span className="text-danger">*</span></label>
                            <select
                                className="form-select"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Description <span className="text-danger">*</span></label>
                            <ReactQuill
                                theme="snow"
                                value={form.description}
                                onChange={handleQuillChange}
                                modules={quillModules}
                                formats={quillFormats}
                            />
                        </div>


                        <div>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? "Creating..." : "Create Blog"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;

// 🔧 Quill Toolbar Config
const quillModules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
    ],
};

const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
];
