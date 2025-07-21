import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/slices/authSlice";
import userReducer from "../redux/slices/userSlice";
import categoryReducer from '../redux/slices/categorySlice';
import companyReducer from '../redux/slices/companySlice';
import storyReducer from "../redux/slices/storySlice";
import siteDetailReducer from "../redux/slices/siteDetailSlice"
import blogReducer from "../redux/slices/blogSlice"
import contactReducer from "../redux/slices/contactSlice";
import interviewReducer from "../redux/slices/interviewSlice"

const store = configureStore({

  reducer: {

    auth: authReducer,
    categories: categoryReducer,
    companies: companyReducer,
    auth: authReducer,
    user: userReducer,
    story: storyReducer,
    siteDetail: siteDetailReducer,
    blog: blogReducer,
    contact: contactReducer,
    interviews: interviewReducer,
  },

});


export default store;
