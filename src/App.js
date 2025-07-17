import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import ErrorPage from "./pages/ErrorPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PrivateRoute from "./components/PrivateRoute"; // 👈 Add this
import SignInPage from "./pages/SignInPage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import { useEffect } from "react";
import UsersListPage from "./pages/UsersListPage";
import CompaniesPage from "./pages/CompaniesPage";
import CategoriesPage from "./pages/CategoriesPage";
import CompanyListRequestPage from "./pages/CompanyListRequestPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import VerfiedStoriesPage from "./pages/VerfiedStoriesPage";
import StoryRequestPage from "./pages/StoryRequestPage";
import EditStoryPage from "./pages/EditStoryPage";
import SiteDetailsPage from "./pages/SiteDetailsPage";
import AddBlogPage from "./pages/AddBlogPage";
import BlogsListPage from "./pages/BlogsListPage";
import EditBlogPage from "./pages/EditBlogPage";
import StoryViewPage from "./pages/StoryViewPage";
import AddStoryPage from "./pages/AddStoryPage";
import StartupStoriesPage from "./pages/StartupStoriesPage";
import ContactListPage from "./pages/ContactListPage";
import EditCompanyPage from "./pages/EditCompanyPage";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;

    const token = user?.token;

    if (user && token) {
      dispatch(setUser({ user, token }));
    }

  }, [dispatch]);


  return (

    <BrowserRouter>

      <RouteScrollToTop />

      <Routes>

        <Route path="/login" element={<SignInPage />} />


        {/* 🔐 Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePageOne />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/company-list-requests" element={<CompanyListRequestPage />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/companies" element={<CompaniesPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/company/:companyId" element={<CompanyDetailPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/edit-company/:id" element={<EditCompanyPage />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/manage-categories" element={<CategoriesPage />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/story-requests" element={<StoryRequestPage />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/edit-story/:id" element={<EditStoryPage />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/stories" element={<VerfiedStoriesPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersListPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/site-details" element={<SiteDetailsPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/create-blog" element={<AddBlogPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/blogs-list" element={<BlogsListPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/edit-blog/:id" element={<EditBlogPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/add-story" element={<AddStoryPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/story-view/:id" element={<StoryViewPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/startup-stories" element={<StartupStoriesPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/contacts" element={<ContactListPage />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
