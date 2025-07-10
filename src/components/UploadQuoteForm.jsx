import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uploadQuote } from '../redux/slices/quotesSlice';
import { toast } from 'react-toastify';
import api from '../services/api';

const UploadQuoteForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    langId: '',
    categoryId: '',
    type: 'image',
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [langList, setLangList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [uploading, setUploading] = useState(false); // ⬅️ New state


  useEffect(() => {
    fetchLangs();
    fetchCats();
  }, []);


  const fetchLangs = async () => {
    try {
      const res = await api.get("/languages");
      console.log("lang res api", res.data.data);
      
      setLangList(res.data.data);
    } catch {
      toast.error("Failed to load languages");
    }
  };

  const fetchCats = async () => {
    try {
      const res = await api.get("/quote-categories");
      setCatList(res.data.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
    if (file && file.type.startsWith("image")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.langId || !formData.categoryId || !mediaFile) {
      toast.error("All fields are required");
      return;
    }

    const data = new FormData();
    data.append("langId", formData.langId);
    data.append("categoryId", formData.categoryId);
    data.append("type", formData.type);
    data.append("media", mediaFile);

    setUploading(true); // Start loader

    try {
      await dispatch(uploadQuote(data)).unwrap();
      toast.success("Quote uploaded successfully");

      // Reset
      setFormData({ langId: '', categoryId: '', type: 'image' });
      setMediaFile(null);
      setPreview(null);
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false); // End loader
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title mb-3">Upload Quote (Image / Video)</h4>
          <hr />

          <form onSubmit={handleSubmit}>
            {/* Language Dropdown */}
            <div className="mb-3">
              <label className="form-label">Select Language</label>
              <select
                name="langId"
                className="form-select"
                value={formData.langId}
                onChange={handleChange}
              >
                <option value="">-- Select Language --</option>
                {langList.map((lang) => (
                  <option key={lang._id} value={lang._id}>
                    {lang.languageName}
                  </option>
                ))}
              </select>
            </div>

            {/* Media Type */}
            <div className="mb-3">
              <label className="form-label">Media Type</label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {/* File Input */}
            <div className="mb-3">
              <label className="form-label">Select File</label>
              <input
                type="file"
                accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: 200 }}
                />
              </div>
            )}

            {/* Upload Button */}
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Please wait...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadQuoteForm;
