import React, { useEffect, useState } from "react";
import "./styles.scss";
import authService from "../../api/ApiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slice/LoaderSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slice/authSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await authService.loginUser(data);
      // if(res?.data?.res){
      // dispatch(login());
      dispatch(login(res.data.user));
      navigate("/");
      console.log(res.data.user._id);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Failed to login. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLoginWithMobile = () => {
    navigate("/loginMobile");
  };

  return (
    <div className="login-page">
      <div className="container">
        <h1>Welcome Back!</h1>
        <p>Enter your email to start shopping and get awesome deals today!</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => handleChange(e)}
            id="email"
            placeholder="Username / Email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
            id="password"
            placeholder="********"
          />

          <div className="forgot-password">
            <a href="#!">Forgot your password?</a>
          </div>

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>
        <div className="or-section">
          <span>OR</span>
        </div>
        <div className="social-login">
          <button className="google-btn" onClick={handleLoginWithMobile}>
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google"
            />
            Log In with Mobile
          </button>
        </div>
        <div className="register">
          <p>
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
