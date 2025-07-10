import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuotes,
  deleteQuote,
  clearQuoteState,
} from '../redux/slices/quotesSlice';
import { fetchQuoteCategories } from '../redux/slices/quoteCategorySlice';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuotesList = () => {

  const dispatch = useDispatch();
  const { quotes, loading, error, successMessage } = useSelector((state) => state.quotes);
  const { categories } = useSelector((state) => state.quoteCategories);

  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');



  // Fetch on mount
  useEffect(() => {
    dispatch(fetchQuotes());
    dispatch(fetchQuoteCategories());
  }, [dispatch]);

  // Show toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearQuoteState());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearQuoteState());
    }
  }, [error, successMessage, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      dispatch(deleteQuote(id));
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const typeMatch = typeFilter === 'all' || q.type === typeFilter;
    const categoryMatch = categoryFilter === 'all' || q.categoryId?._id === categoryFilter;
    return typeMatch && categoryMatch;
  });

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">All Quotes (Image + Video)</h4>
      </div>

      <hr style={{ marginTop: 15, marginBottom: 15 }} />

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Media Types</option>
            <option value="image">Image Only</option>
            <option value="video">Video Only</option>
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 text-end">
            <Link to="/upload-quote" className='btn btn-primary w-200'>
              Upload New Quote
            </Link>
        </div>

      </div>

      <hr style={{ marginTop: 15, marginBottom: 15 }} />

      {/* Loader */}
      {loading && <p>Loading...</p>}

      {/* Cards */}
      <div className="row">
        {filteredQuotes.length === 0 && !loading && <p>No quotes found for selected filters.</p>}
        {filteredQuotes.map((q) => (
          <div className="col-md-4 mb-4" key={q._id}>
            <div className="card shadow-sm">
              {q.type === 'image' ? (
                <img
                  src={q.url}
                  alt="quote"
                  className="card-img-top"
                  style={{ height: 250, objectFit: 'contain' }}
                />
              ) : (
                <video
                  controls
                  className="w-100"
                  style={{ height: 250, objectFit: 'contain' }}
                >
                  <source src={q.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              <div className="card-body d-flex justify-content-between align-items-center">
                <div className='d-flex' style={{gap: 20}}>
                  <span className="badge bg-secondary">{q.type.toUpperCase()}</span>
                  <span className="text-sm">{q.categoryId?.name}</span>
                </div>
                <FaTrash
                  className="text-danger"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(q._id)}
                  title="Delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesList;
