import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../redux/slices/categorySlice';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const res = await dispatch(deleteCategory(id));
      if (!res.error) {
        toast.success('Category deleted successfully');
      }
    }
  };

  const handleShowModal = (category = null) => {
    if (category) {
      setEditMode(true);
      setEditingId(category._id);
      setCategoryName(category.name);
    } else {
      setEditMode(false);
      setEditingId(null);
      setCategoryName('');
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === '') return;

    if (editMode) {
      const res = await dispatch(updateCategory({ id: editingId, name: categoryName }));
      if (!res.error) toast.success('Category updated successfully');
    } else {
      const res = await dispatch(createCategory({ name: categoryName }));
      if (!res.error) toast.success('Category created successfully');
    }

    setShowModal(false);
    setCategoryName('');
    setEditingId(null);
    setEditMode(false);
  };

  const filtered = categories
    .filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest on top

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Categories</h5>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            + Add Category
          </button>
        </div>

        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by category name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((cat, index) => (
                      <tr key={cat._id}>
                        <td>{index + 1}</td>
                        <td>{cat.name}</td>
                        <td>{new Date(cat.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => handleShowModal(cat)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(cat._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Edit Category' : 'Add Category'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update' : 'Create'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
