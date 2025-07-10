import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStatuses,
  uploadStatus,
  deleteStatus,
} from '../redux/slices/statusSlice';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const StatusManager = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.status);
  const { user } = useSelector((state) => state.auth); // ✅ Get logged-in user

  const [showModal, setShowModal] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchStatuses());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!statusText || !imageFile) {
      toast.error('Please provide text and image');
      return;
    }

    if (!user?._id) {
      toast.error('User not logged in');
      return;
    }

    const formData = new FormData();
    formData.append('text', statusText);
    formData.append('image', imageFile);
    formData.append('user', user._id); // ✅ pass user ID in form

    const result = await dispatch(uploadStatus(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Status uploaded!');
      setStatusText('');
      setImageFile(null);
      setShowModal(false);
    } else {
      toast.error(result.payload || 'Failed to upload status');
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteStatus(id));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Status deleted!');
    } else {
      toast.error(result.payload || 'Failed to delete');
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">All Statuses</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Status
        </Button>
      </div>

      {/* Status List */}
      <div className="row mt-20">
        {loading ? (
          <p>Loading...</p>
        ) : items.length ? (
          items.map((status) => (
            <div className="col-md-4 mb-3" key={status._id}>
              <div className="card bg-light shadow-sm">
                {status.image && (
                  <img
                    src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/quotes/${status.image}`}
                    className="card-img-top"
                    alt="Status"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex justify-content-between align-items-center">
                  <p className="mb-0">{status.text}</p>
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(status._id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No statuses found</p>
        )}
      </div>

      {/* Add Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Status Text</Form.Label>
            <Form.Control
              type="text"
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="Enter status"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StatusManager;
