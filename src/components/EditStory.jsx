import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStoryById,
  updateStory,
  clearStoryMessage,
} from '../redux/slices/storySlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github.css';

const EditStory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { singleStory, message, error } = useSelector((state) => state.story);
  const { categories } = useSelector((state) => state.categories);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getStoryById(id));
    dispatch(fetchCategories());
    hljs.configure({
      languages: ['javascript', 'python', 'java', 'cpp', 'php'],
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (singleStory) {
      setTitle(singleStory.title);
      setDescription(singleStory.description);
      setCategory(singleStory.category?._id || '');
      setImagePreview(singleStory.storyImage || null);
    }
  }, [singleStory]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearStoryMessage());
      navigate('/admin/stories');
    }
    if (error) {
      toast.error(error);
      dispatch(clearStoryMessage());
    }
  }, [message, error, dispatch, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description); // ✅ use state directly
    formData.append('category', category);
    if (imageFile) formData.append('file', imageFile);

    dispatch(updateStory({ id, data: formData }));
  };

  const modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'code-block'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-40">
        <h4 className="mb-4">✏️ Edit Story</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              placeholder="Write your story here..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload New Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ maxHeight: '150px' }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success mt-3">
            ✅ Update Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStory;
