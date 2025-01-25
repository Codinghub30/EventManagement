import React, { useEffect, useState } from "react";
import "./styles.scss";
import authService from "../../api/ApiService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobilenumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async () => {
    try {
      const response = await authService.registerUser(formData);
      console.log(response);

      dispatch(login(response.data.newUser));
      navigate("/company");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  useEffect(() => {}, []);

  return (
    <div className="signup-page">
      <div className="container">
        <h1>Welcome!</h1>
        <p>
          Sign up to start your shopping journey and get awesome deals today!
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your UserName"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            placeholder="Mobile Number"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn">
            Sign Up
          </button>
        </form>
        <div className="social-login">
          <p>OR</p>
          <button className="google-btn">Sign Up with Google</button>
          <button className="facebook-btn">Sign Up with Facebook</button>
        </div>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
