import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInterview } from '../redux/slices/interviewSlice';
import { ToastContainer } from 'react-toastify';

const AddInterview = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        personName: '',
        designation: '',
        excerpt: '',
        qa: [{ question: '', answer: '' }],
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleQAChange = (index, field, value) => {
        const updatedQA = [...formData.qa];
        updatedQA[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            qa: updatedQA,
        }));
    };

    const addQAField = () => {
        setFormData((prev) => ({
            ...prev,
            qa: [...prev.qa, { question: '', answer: '' }],
        }));
    };

    const removeQAField = (index) => {
        const updatedQA = formData.qa.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            qa: updatedQA,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('personName', formData.personName);
        data.append('designation', formData.designation);
        data.append('excerpt', formData.excerpt);
        if (file) data.append('profileImage', file);
        data.append('qa', JSON.stringify(formData.qa));

        dispatch(addInterview(data));

        setFormData({
            personName: '',
            designation: '',
            excerpt: '',
            qa: [{ question: '', answer: '' }],
        });
        setFile(null);
    };

    return (
        <div className="container mt-4">
            <div className='row'>
                <div className='col-lg-12 col-xs-12 col-sm-12'>

                    <div className='card'>
                        <div className='card-header bg-danger'>
                            <h6 className="mb-0 text-white">Add Interview</h6>
                        </div>
                        <div className='card-body'>

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                    <label className="form-label">Excerpt ( Add About Person in short )</label>
                                    <textarea
                                        className="form-control"
                                        name="excerpt"
                                        rows="3"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Profile Image (optional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="profileImage"
                                        onChange={handleFileChange}
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
                                                onChange={(e) =>
                                                    handleQAChange(index, 'question', e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Answer</label>
                                            <textarea
                                                className="form-control"
                                                value={qaItem.answer}
                                                onChange={(e) =>
                                                    handleQAChange(index, 'answer', e.target.value)
                                                }
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

                                <hr />

                                <div className='mt-5'>
                                    <button type="submit" className="btn btn-primary">
                                        Add Interview
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>



            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddInterview;
