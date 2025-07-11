'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoryById } from '../redux/slices/storySlice';
import { useParams } from 'react-router-dom';

const StoryView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleStory, loading } = useSelector((state) => state.story);

  useEffect(() => {
    if (id) dispatch(getStoryById(id));
  }, [dispatch, id]);

  if (loading || !singleStory) return <p className="text-center py-5">Loading...</p>;

  const { title, description, storyImage, category } = singleStory;

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm">
        {storyImage && (
          <img
            src={storyImage}
            alt={title}
            className="card-img-top"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title fw-bold">{title}</h3>
          <p className="text-muted mb-3">{category?.name}</p>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryView;
