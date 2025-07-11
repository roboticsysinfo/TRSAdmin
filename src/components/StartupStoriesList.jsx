import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStartupStories,
  deleteStory,
} from '../redux/slices/storySlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';

const StartupStoriesList = () => {
    
  const dispatch = useDispatch();

  const { stories, total, currentPage, totalPages, loading } = useSelector((state) => state.story);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // ✅ Fetch startup stories
  useEffect(() => {
    dispatch(getStartupStories({ page, limit: 6, search }));
  }, [page, search, dispatch]);

  // ✅ Handle delete and refetch
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      const res = await dispatch(deleteStory(id));
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Story deleted');
        dispatch(getStartupStories({ page, limit: 6, search }));
      }
    }
  };

  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const verifiedStories = stories.filter((story) => story.isVerified);

  return (
    <div className="container py-4">
      <h4 className="mb-40">🚀 Startup Stories</h4>
      <hr />

      <div className="mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search startup stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center my-5">Loading...</div>
      ) : verifiedStories.length === 0 ? (
        <div className="text-center my-5 text-muted">No verified startup stories found.</div>
      ) : (
        <div className="row g-4">
          {verifiedStories.map((story) => (
            <div className="col-md-4" key={story._id}>
              <div className="card shadow-sm h-100">
                {story.storyImage && (
                  <img
                    src={story.storyImage}
                    className="card-img-top"
                    alt="story"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{story.title}</h5>
                  <p className="card-text text-muted" style={{ minHeight: '60px' }}>
                    {stripHtml(story.description)?.slice(0, 100)}...
                  </p>

                  <div className="d-flex justify-content-between">
                    <a
                      href={`https://truerealstory.com/story/${slugify(story.title, {
                        lower: true,
                        strict: true,
                      })}/${story._id}`}
                      className="btn btn-sm btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                    <Link to={`/edit-story/${story._id}`} className="btn btn-sm btn-warning">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(story._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
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

export default StartupStoriesList;
