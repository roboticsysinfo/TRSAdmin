import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompany, fetchCompanyByUserId } from '../redux/slices/companySlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditCompany = () => {
    const dispatch = useDispatch();
    const router = useNavigate();
    const { loading, userCompany } = useSelector((state) => state.companies);
    const { categories } = useSelector((state) => state.categories);
    const { user } = useSelector((state) => state.auth);
    const userId = user?._id;

    const [formData, setFormData] = useState({
        name: '',
        about: '',
        legalName: '',
        headquarter: '',
        foundingDate: '',
        businessModel: '',
        noOfEmployees: '',
        category: '',
        logo: null,
        socialMedia: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
            googleMyBusiness: '',
            website: ''
        },
        coreTeam: [{ memberName: '', designation: '' }]
    });

    useEffect(() => {
        dispatch(fetchCategories());
        if (userId) {
            dispatch(fetchCompanyByUserId(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userCompany) {
            setFormData({
                ...userCompany,
                logo: null,
                socialMedia: userCompany.socialMedia || {
                    facebook: '',
                    instagram: '',
                    linkedin: '',
                    twitter: '',
                    googleMyBusiness: '',
                    website: ''
                },
                coreTeam: userCompany.coreTeam?.length
                    ? userCompany.coreTeam
                    : [{ memberName: '', designation: '' }]
            });
        }
    }, [userCompany]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'logo') {
            setFormData((prev) => ({ ...prev, logo: files[0] }));
        } else if (name.includes('socialMedia')) {
            const field = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                socialMedia: {
                    ...prev.socialMedia,
                    [field]: value
                }
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCoreTeamChange = (index, field, value) => {
        const newTeam = [...formData.coreTeam];
        newTeam[index][field] = value;
        setFormData({ ...formData, coreTeam: newTeam });
    };

    const addTeamMember = () => {
        setFormData({ ...formData, coreTeam: [...formData.coreTeam, { memberName: '', designation: '' }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userCompany?._id) {
            toast.error("Company not loaded yet.");
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('about', formData.about);
        data.append('legalName', formData.legalName);
        data.append('headquarter', formData.headquarter);
        data.append('foundingDate', formData.foundingDate);
        data.append('businessModel', formData.businessModel);
        data.append('noOfEmployees', formData.noOfEmployees);
        data.append('category', formData.category);
        if (formData.logo) {
            data.append('logo', formData.logo);
        }
        data.append('socialMedia', JSON.stringify(formData.socialMedia));
        data.append('coreTeam', JSON.stringify(formData.coreTeam));

        const res = await dispatch(updateCompany({ id: userCompany._id, updateData: data }));

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Company updated successfully!');
            router('/account');
        } else {
            toast.error(res.payload || 'Update failed');
        }
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-header bg-secondary">
                            <h5 className="fw-bold mb-0 text-white">Edit Company</h5>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                <div className="mb-3">
                                    <label className="form-label">Company Logo</label>
                                    <input type='file' className="form-control" name="logo" onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Company Name</label>
                                    <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Legal Name</label>
                                    <input className="form-control" name="legalName" value={formData.legalName} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Headquarter</label>
                                    <input className="form-control" name="headquarter" value={formData.headquarter} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Founding Date</label>
                                    <input type="date" className="form-control" name="foundingDate" value={formData.foundingDate} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">About</label>
                                    <textarea className="form-control" name="about" value={formData.about} onChange={handleChange}></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Business Model</label>
                                    <select className="form-select" name="businessModel" value={formData.businessModel} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="B2C">B2C</option>
                                        <option value="B2B">B2B</option>
                                        <option value="B2B2C">B2B2C</option>
                                        <option value="D2C">D2C</option>
                                        <option value="C2C">C2C</option>
                                        <option value="B2G">B2G</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Number of Employees</label>
                                    <select className="form-select" name="noOfEmployees" value={formData.noOfEmployees} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="0-10">0–10</option>
                                        <option value="10-100">10–100</option>
                                        <option value="100-1000">100–1,000</option>
                                        <option value="1000-100000">1,000–100,000</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select Category</label>
                                    <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="">Select Category</option>
                                        {categories?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Social Media Links</label>
                                    <input className="form-control mb-2" name="socialMedia.facebook" placeholder="Facebook" value={formData.socialMedia.facebook} onChange={handleChange} />
                                    <input className="form-control mb-2" name="socialMedia.instagram" placeholder="Instagram" value={formData.socialMedia.instagram} onChange={handleChange} />
                                    <input className="form-control mb-2" name="socialMedia.linkedin" placeholder="LinkedIn" value={formData.socialMedia.linkedin} onChange={handleChange} />
                                    <input className="form-control mb-2" name="socialMedia.twitter" placeholder="Twitter" value={formData.socialMedia.twitter} onChange={handleChange} />
                                    <input className="form-control mb-2" name="socialMedia.googleMyBusiness" placeholder="Google My Business" value={formData.socialMedia.googleMyBusiness} onChange={handleChange} />
                                    <input className="form-control" name="socialMedia.website" placeholder="Website" value={formData.socialMedia.website} onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Core Team</label>
                                    {formData.coreTeam.map((member, index) => (
                                        <div key={index} className="mb-2 row">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    placeholder="Member Name"
                                                    className="form-control"
                                                    value={member.memberName}
                                                    onChange={(e) => handleCoreTeamChange(index, 'memberName', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    placeholder="Designation"
                                                    className="form-control"
                                                    value={member.designation}
                                                    onChange={(e) => handleCoreTeamChange(index, 'designation', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-outline-secondary btn-sm mt-2" onClick={addTeamMember}>
                                        + Add Team Member
                                    </button>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Company'}
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCompany;
