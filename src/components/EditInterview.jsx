import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInterviewById,
  updateInterview,
  clearSelectedInterview
} from '../redux/slices/interviewSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected, loading } = useSelector((state) => state.interviews);

  const [formData, setFormData] = useState({
    interviewTitle: '',
    personName: '',
    designation: '',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    qa: [{ question: '', answer: '' }]
  });

  const [profileFile, setProfileFile] = useState(null);
  const [interviewFile, setInterviewFile] = useState(null);

  useEffect(() => {
    dispatch(fetchInterviewById(id));
    return () => {
      dispatch(clearSelectedInterview());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selected) {
      setFormData({
        interviewTitle: selected.interviewTitle || '',
        personName: selected.personName || '',
        designation: selected.designation || '',
        excerpt: selected.excerpt || '',
        metaTitle: selected.metaTitle || '',
        metaDescription: selected.metaDescription || '',
        metaKeywords: selected.metaKeywords || '',
        qa: selected.qa?.length ? selected.qa : [{ question: '', answer: '' }]
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQAChange = (index, field, value) => {
    const updatedQA = [...formData.qa];
    updatedQA[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      qa: updatedQA
    }));
  };

  const addQAField = () => {
    setFormData((prev) => ({
      ...prev,
      qa: [...prev.qa, { question: '', answer: '' }]
    }));
  };

  const removeQAField = (index) => {
    const updatedQA = formData.qa.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      qa: updatedQA
    }));
  };

  const handleFileChange = (e, type) => {
    if (type === 'profile') setProfileFile(e.target.files[0]);
    if (type === 'interview') setInterviewFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('interviewTitle', formData.interviewTitle);
    data.append('personName', formData.personName);
    data.append('designation', formData.designation);
    data.append('excerpt', formData.excerpt);
    data.append('metaTitle', formData.metaTitle);
    data.append('metaDescription', formData.metaDescription);
    data.append('metaKeywords', formData.metaKeywords);
    data.append('qa', JSON.stringify(formData.qa));

    if (profileFile) data.append('profileImage', profileFile);
    if (interviewFile) data.append('interviewImage', interviewFile);

    dispatch(updateInterview({ id, formData: data })).then((res) => {
      if (!res.error) navigate('/interviews');
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning">
          <h6 className="mb-0 text-white">Edit Interview</h6>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Interview Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="interviewTitle"
                  value={formData.interviewTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Person Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="personName"
                  value={formData.personName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Excerpt</label>
                <textarea
                  className="form-control"
                  name="excerpt"
                  rows="3"
                  value={formData.excerpt}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Meta Description</label>
                <textarea
                  className="form-control"
                  name="metaDescription"
                  rows="2"
                  value={formData.metaDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Meta Keywords (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Image (optional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, 'profile')}
                  accept="image/*"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Interview Image (optional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, 'interview')}
                  accept="image/*"
                />
              </div>

              <hr />
              <h5>Question & Answers</h5>
              {formData.qa.map((qaItem, index) => (
                <div key={index} className="mb-3 border rounded p-3">
                  <div className="mb-2">
                    <label className="form-label">Question</label>
                    <input
                      type="text"
                      className="form-control"
                      value={qaItem.question}
                      onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Answer</label>
                    <textarea
                      className="form-control"
                      value={qaItem.answer}
                      onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                      rows="2"
                      required
                    />
                  </div>
                  {formData.qa.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeQAField(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={addQAField}
              >
                Add Another Q&A
              </button>

              <div className="mt-4">
                <button type="submit" className="btn btn-primary">
                  Update Interview
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInterview;
