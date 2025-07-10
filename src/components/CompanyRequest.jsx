import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, deleteCompany } from '../redux/slices/companySlice';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CompanyRequest = () => {
    
    const dispatch = useDispatch();
    const { companies, loading } = useSelector((state) => state.companies);

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            await dispatch(deleteCompany(id));
            dispatch(fetchCompanies());
        }
    };

    const sortedCompanies = companies
        .filter(company => !company.isVerified)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Request list for Company Listing</h4>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p className="text-center">Loading companies...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Logo</th>
                                        <th>Company Name</th>
                                        <th>Business Model</th>
                                        <th>Category</th>
                                        <th>Founded</th>
                                        <th>Headquarters</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCompanies.length > 0 ? (
                                        sortedCompanies.map((company, index) => (
                                            <tr key={company._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={company.logo || "https://cdn-icons-png.flaticon.com/512/1077/1077063.png"}
                                                        alt="Company Logo"
                                                        width="40"
                                                        height="40"
                                                        style={{ objectFit: "cover", borderRadius: "4px" }}
                                                    />
                                                </td>
                                                <td>{company.name || '-'}</td>
                                                <td>{company.businessModel || '-'}</td>
                                                <td>{company.category?.name || '-'}</td>
                                                <td>{company.foundingDate ? new Date(company.foundingDate).getFullYear() : '-'}</td>
                                                <td>{company.headquarter || '-'}</td>
                                                <td>{new Date(company.createdAt).toLocaleString()}</td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <Link
                                                            className="btn btn-sm btn-success"
                                                            to={`/company/${company._id}`}
                                                        >
                                                            View Details
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(company._id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                No Request for Company Listing.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyRequest;
