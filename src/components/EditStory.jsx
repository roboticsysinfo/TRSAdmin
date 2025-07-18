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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  // New SEO fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    dispatch(getStoryById(id));
    dispatch(fetchCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (singleStory) {
      setTitle(singleStory.title);
      setDescription(singleStory.description);
      setCategory(singleStory.category?._id || '');
      setImagePreview(singleStory.storyImage || null);
      setMetaTitle(singleStory.metaTitle || '');
      setMetaDescription(singleStory.metaDescription || '');
      setMetaKeywords(singleStory.metaKeywords?.join(', ') || '');
      setIsFeatured(singleStory.isFeatured || false);
    }
  }, [singleStory]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearStoryMessage());
      navigate('/stories');
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
    formData.append('isFeatured', isFeatured);

    if (imageFile) formData.append('storyImage', imageFile);

    dispatch(updateStory({ id, data: formData }));
  };

  return (
    
    <div className="container py-5">
      <div className="card shadow-sm p-40">
        <h4 className="mb-4">✏️ Edit Story</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title */}
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

          {/* Description */}
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

          {/* Category */}
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

          {/* Upload Image */}
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

          {/* Meta Title */}
          <div className="mb-3">
            <label className="form-label">Meta Title</label>
            <input
              type="text"
              className="form-control"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>

          {/* Meta Description */}
          <div className="mb-3">
            <label className="form-label">Meta Description</label>
            <textarea
              className="form-control"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows="3"
            />
          </div>

          {/* Meta Keywords */}
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

          {/* isFeatured */}
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

          {/* Submit */}
          <button type="submit" className="btn btn-success mt-3">
            ✅ Update Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStory;
