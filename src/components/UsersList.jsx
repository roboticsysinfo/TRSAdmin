import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllUsers,
  deleteUser
} from '../redux/slices/userSlice';
import { RiDeleteBin6Line } from "react-icons/ri";

const UsersList = () => {
  
  const dispatch = useDispatch();
  const { users, totalPages, currentPage, loading } = useSelector(state => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit: 10, search: searchTerm }));
  }, [dispatch, page, searchTerm]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(userId));
      dispatch(getAllUsers({ page, limit: 10, search: searchTerm }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className='card h-100 p-0 radius-12' style={{ padding: '20px' }}>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h2>User List</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '8px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      {loading ? (
        <p className="text-center my-4">Loading users...</p>
      ) : (
        <div className='card-body'>
          <table className='table table-bordred' style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f4f4f4' }}>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user?._id}>
                    <td>{(page - 1) * 10 + index + 1}</td>
                    <td>{user?.name || '-'}</td>
                    <td>{user?.email || '-'}</td>
                    <td>{user?.phoneNumber || 0}</td>
                    <td>{new Date(user?.createdAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleDelete(user?._id)} style={{ color: 'red' }}>
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="text-center">No users found</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <button className='btn btn-secondary' onClick={handlePrev} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button className='btn btn-secondary' onClick={handleNext} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
