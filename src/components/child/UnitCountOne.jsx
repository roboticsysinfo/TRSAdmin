import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/slices/userSlice';
import { fetchCompanies } from '../../redux/slices/companySlice';
import { getAllStories } from '../../redux/slices/storySlice';

const UnitCountOne = () => {
  const dispatch = useDispatch();

  const { total: userTotal } = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.companies);
  const { total: storyTotal } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(fetchCompanies());
    dispatch(getAllStories({ page: 1, limit: 1 })); // just need total
  }, [dispatch]);

  return (
    <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">

      {/* Total Users */}
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-1 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">Total Users</p>
                <h6 className="mb-0">{userTotal || 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="gridicons:multiple-users" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Companies */}
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-2 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">Total Companies</p>
                <h6 className="mb-0">{companies?.length || 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="fa-solid:award" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Stories */}
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-3 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">Total Stories</p>
                <h6 className="mb-0">{storyTotal || 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="fluent:people-20-filled" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UnitCountOne;
