import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const MasterLayout = ({ children }) => {

  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    const handleDropdownClick = (event) => {

      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };


  const handleLogout = () => {
    // Clear localStorage values
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch(logout());

    // Show toast
    toast.success('Logout successful');

    // Navigate to login
    navigate('/login');
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>

          <Link to='/' className='sidebar-logo'>

            <img
              src='assets/images/logo.png'
              alt='site logo'
              className='light-logo'
            />

            <img
              src='assets/images/logo-light.png'
              alt='site logo'
              className='dark-logo'
            />

            <img
              src='assets/images/logo-icon.png'
              alt='site logo'
              className='logo-icon'
            />

          </Link>

        </div>

        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>

            <li>

              <Link to='/'>
                <span>Dashboard</span>
              </Link>

            </li>

            <li className='sidebar-menu-group-title'>Main</li>

            <li>
              <NavLink
                to='/add-story'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                  Add Story
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/startup-stories'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                  Startup Stories
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/company-list-requests'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Company Requests
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/companies'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Verified Companies
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/story-requests'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Story Requests
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/stories'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Verified Stories
              </NavLink>
            </li>


            <li>
              <NavLink
                to='/manage-categories'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Categories
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/users'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/create-blog'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Create Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/blogs-list'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Blogs List
              </NavLink>
            </li>


            <li>
              <NavLink
                to='/site-details'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                Site Details
              </NavLink>
            </li>


          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
                <form className='navbar-search'>
                  <input type='text' name='search' placeholder='Search' />
                  <Icon icon='ion:search-outline' className='icon' />
                </form>
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
                {/* ThemeToggleButton */}
                <ThemeToggleButton />

                <div className='dropdown'>
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='assets/images/user.png'
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                          {user?.name}
                        </h6>
                        <span className='text-secondary-light fw-medium text-sm'>
                          Admin
                        </span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon
                          icon='radix-icons:cross-1'
                          className='icon text-xl'
                        />
                      </button>
                    </div>
                    <ul className='to-top-list'>

                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3'
                          onClick={handleLogout}
                        >
                          <Icon icon='lucide:power' className='icon text-xl' />{" "}
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 True Real Story. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
