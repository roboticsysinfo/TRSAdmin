import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyById, verifyCompany } from "../redux/slices/companySlice";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CompanyDetail = () => {

    const { companyId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedCompany: company, loading, error } = useSelector(
        (state) => state.companies
    );

    useEffect(() => {
        if (companyId) {
            dispatch(fetchCompanyById(companyId));
        }
    }, [companyId, dispatch]);

    const handleVerify = async () => {
        const result = await dispatch(verifyCompany(companyId));

        if (verifyCompany.fulfilled.match(result)) {
            toast.success("✅ Company verified successfully!");
            navigate("/companies");
        } else {
            toast.error(result.payload || "❌ Failed to verify company");
        }
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="text-danger text-center my-5">{error}</div>;
    if (!company) return <div className="text-center my-5">No company found.</div>;

    return (
        <div className="container py-5">
            <div className="card shadow-sm p-40">


                {!company.isVerified && (
                    <div className="card-header text-end" >
                        <div className="mb-4">
                            <button className="btn btn-danger btn-sm " onClick={handleVerify}>
                                ✅ Verify Company
                            </button>
                        </div>
                    </div>
                )}


                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold mb-0">{company.name}</h3>
                    <span className={`badge ${company.isVerified ? "bg-success" : "bg-warning"}`}>
                        {company.isVerified ? "Verified" : "Not Verified"}
                    </span>
                </div>

                <p className="text-muted">{company.about}</p>

                <div className="row mb-3">
                    <div className="col-md-6"><strong>Category:</strong> {company?.category?.name || "N/A"}</div>
                    <div className="col-md-6"><strong>Business Model:</strong> {company.businessModel}</div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6"><strong>Legal Name:</strong> {company.legalName}</div>
                    <div className="col-md-6"><strong>Headquarter:</strong> {company.headquarter}</div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6"><strong>Founded:</strong> {moment(company.foundingDate).format("MMMM D, YYYY")}</div>
                    <div className="col-md-6"><strong>No. of Employees:</strong> {company.noOfEmployees}</div>
                </div>

                <hr />

                <h5 className="mb-3">Core Team</h5>
                {company.coreTeam?.length > 0 ? (
                    <div className="row">
                        {company.coreTeam.map((member) => (
                            <div className="col-md-6 mb-2" key={member._id}>
                                <div className="border p-3 rounded">
                                    <strong>{member.memberName}</strong> <br />
                                    <span className="text-muted">{member.designation}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No core team listed.</p>
                )}

                <hr />

                <h5 className="mb-3">Contact & Owner Info</h5>
                <p>
                    <strong>Owner Name:</strong> {company.user?.name} <br />
                    <strong>Email:</strong> {company.user?.email} <br />
                    <strong>Phone:</strong> {company.user?.phoneNumber}
                </p>

                <hr />

                <h5 className="mb-3">Social Media</h5>
                <ul className="list-inline">
                    {Object.entries(company.socialMedia || {}).map(([platform, url]) => (
                        <li key={platform} className="list-inline-item me-3">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CompanyDetail;
