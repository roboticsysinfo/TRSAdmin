import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInterview } from '../redux/slices/interviewSlice';

const AddInterview = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    interviewTitle: '',
    personName: '',
    designation: '',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    qa: [{ question: '', answer: '' }],
  });

  const [profileFile, setProfileFile] = useState(null);
  const [interviewFile, setInterviewFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQa = [...formData.qa];
    updatedQa[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      qa: updatedQa,
    }));
  };

  const addQaField = () => {
    setFormData((prevData) => ({
      ...prevData,
      qa: [...prevData.qa, { question: '', answer: '' }],
    }));
  };

  const removeQaField = (index) => {
    const updatedQa = [...formData.qa];
    updatedQa.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      qa: updatedQa,
    }));
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
    if (profileFile) data.append('profileImage', profileFile);
    if (interviewFile) data.append('interviewImage', interviewFile);
    data.append('qa', JSON.stringify(formData.qa));

    dispatch(addInterview(data));

    setFormData({
      interviewTitle: '',
      personName: '',
      designation: '',
      excerpt: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      qa: [{ question: '', answer: '' }],
    });
    setProfileFile(null);
    setInterviewFile(null);
  };

  return (
    <div className="container mt-4">

      <div className='card'>

        <div className='card-header bg-danger '>
          <h5 className="mb-0 text-white">Add Interview</h5>
        </div>

        <div className='card-body'>


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
                rows="2"
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
              <label className="form-label">Profile Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setProfileFile(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Interview Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setInterviewFile(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <h5>Question & Answers</h5>
            {formData.qa.map((item, index) => (
              <div key={index} className="border p-3 mb-3 rounded">
                <div className="mb-2">
                  <label className="form-label">Question</label>
                  <input
                    type="text"
                    className="form-control"
                    name="question"
                    value={item.question}
                    onChange={(e) => handleQaChange(index, e)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Answer</label>
                  <textarea
                    className="form-control"
                    name="answer"
                    rows="2"
                    value={item.answer}
                    onChange={(e) => handleQaChange(index, e)}
                    required
                  />
                </div>
                {formData.qa.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeQaField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary mb-3" onClick={addQaField}>
              Add Q&A
            </button>

            <div>
              <button type="submit" className="btn btn-primary">
                Submit Interview
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};

export default AddInterview;
