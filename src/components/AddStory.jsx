import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStory, clearStoryMessage } from '../redux/slices/storySlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddStory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error } = useSelector((state) => state.story);
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);

  const isAdmin = user?.role === 'admin' || user?.isAdmin === true;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin) {
      setIsVerified(true);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearStoryMessage());
      navigate('/');
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
    formData.append('description', description);
    formData.append('category', category);
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);
    formData.append('metaKeywords', metaKeywords);
    formData.append('user', user._id);
    formData.append('isFeatured', isFeatured);
    formData.append('isVerified', isVerified); // ✅ trusted only if admin
    if (imageFile) formData.append('storyImage', imageFile);

    dispatch(addStory(formData));
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-40">
        <h4 className="mb-4">➕ Add New Story</h4>
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
            <CKEditor
              editor={ClassicEditor}
              data={description}
              config={{
                toolbar: [
                  'heading', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
                  '|', 'blockQuote', 'insertTable', 'imageUpload', 'undo', 'redo', 'codeBlock'
                ]
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
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
            <label className="form-label">Upload Image</label>
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

          <div className="mb-3">
            <label className="form-label">Meta Title</label>
            <input
              type="text"
              className="form-control"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Meta Description</label>
            <textarea
              className="form-control"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Meta Keywords (comma separated)</label>
            <input
              type="text"
              className="form-control"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              placeholder="e.g., react, nextjs, seo"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isFeatured">
              Mark as Featured
            </label>
          </div>

          {isAdmin && (
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isVerified"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isVerified">
                Mark as Verified
              </label>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-3">
            ➕ Add Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
