import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInterviews,
  deleteInterview
} from '../redux/slices/interviewSlice';
import { Link } from 'react-router-dom';

const InterviewList = () => {
  const dispatch = useDispatch();
  const { all, totalItems, totalPages, currentPage, limit, loading } = useSelector(state => state.interviews);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInterviews({ search, page, limit: 10 }));
  }, [dispatch, search, page]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this interview?')) {
      dispatch(deleteInterview(id));
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by person or designation"
        value={search}
        onChange={handleSearch}
      />

      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Person</th>
            <th>Designation</th>
            <th>Excerpt</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading && all?.length > 0 ? all.map((item, index) => (
            <tr key={item._id}>
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{item.personName}</td>
              <td>{item.designation}</td>
              <td>{item.excerpt}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/edit-interview/${item._id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6" className="text-center">No interviews found</td></tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${i + 1 === page ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default InterviewList;
