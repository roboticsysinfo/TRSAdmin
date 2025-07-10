import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuoteCategories,
  createQuoteCategory,
  deleteQuoteCategory,
} from '../redux/slices/quoteCategorySlice';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function QuoteCategoryManager() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.quoteCategories);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    dispatch(fetchQuoteCategories());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    const result = await dispatch(createQuoteCategory({ name: newCategory }));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Category added');
      setNewCategory('');
      setShowModal(false);
    } else {
      toast.error(result.payload || 'Failed to create category');
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteQuoteCategory(id));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Category deleted');
    } else {
      toast.error(result.payload || 'Delete failed');
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">All Categories</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Category
        </Button>
      </div>

      {/* Category List */}
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : categories.length ? (
          categories.map((cat) => (
            <div className="col-md-4 mb-3" key={cat._id}>
              <div className="card shadow-sm bg-light">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <strong>{cat.name}</strong>
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(cat._id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>

      {/* Add Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuoteCategoryManager;
