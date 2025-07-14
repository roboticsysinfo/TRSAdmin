import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
} from '../redux/slices/contactSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contact);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="container mt-4">
      <h5>Contact List</h5>

      {loading ? (
        <div className="text-center my-4">Loading...</div>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No contacts found.</td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email || '-'}</td>
                  <td>{contact.phone || '-'}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#viewModal"
                      onClick={() => handleView(contact)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* View Modal */}
      <div
        className="modal fade"
        id="viewModal"
        tabIndex="-1"
        aria-labelledby="viewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">Contact Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {selectedContact ? (
                <>
                  <p><strong>Name:</strong> {selectedContact.name}</p>
                  <p><strong>Email:</strong> {selectedContact.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedContact.phone || 'N/A'}</p>
                  <p><strong>Message:</strong><br />{selectedContact.message}</p>
                  <p><strong>Received:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
                </>
              ) : (
                <p>No contact selected.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
