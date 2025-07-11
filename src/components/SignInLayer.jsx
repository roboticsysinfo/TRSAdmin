import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail, logout, clearError } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const SignInLayer = () => {

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, token } = useSelector((state) => state.auth);

  // Show error toast if login fails
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handle successful login
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        const userWithToken = { ...user, token };  // 🔁 merge token into user
        localStorage.setItem("user", JSON.stringify(userWithToken)); // ✅ store full user
        toast.success("Login successful!");
        navigate("/");
      } else {
        dispatch(logout());
        toast.error("Only Admins can login through email/phone.");
      }
    }
  }, [user, dispatch, navigate, token]);


  const handleSubmit = (e) => {

    e.preventDefault();
    if (!emailOrPhone || !password) {
      toast.error("Please fill all fields");
      return;
    }
    dispatch(loginWithEmail({ emailOrPhone, password }));

  };

  return (

    <section className='auth bg-base d-flex flex-wrap justify-content-center'>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>

          <div className="text-center">

            <Link to='/' className='mb-20  max-w-290-px'>
              <img src='assets/images/logo.png' alt='' style={{ width: "100%", height: 100 }} />
            </Link>

            <h4 className='mb-2'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome! Please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='text'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email or Phone'
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>

            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type='password'
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
              disabled={loading}
              style={{backgroundColor: "#df0a09", borderColor: "#df0a09"}}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

        </div>
      </div>
    </section>

  );
};

export default SignInLayer;
