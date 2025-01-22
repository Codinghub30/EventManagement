import React, { useState } from "react";
import "./styles.scss";
import authService from "../../../../api/ApiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../redux/slice/LoaderSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../redux/slice/authSlice";

const LoginWithMobile = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(0);
  const [userData, setUserData] = useState([]);
  //   const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   8526190332

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await authService.loginWithMobile({
        mobilenumber: parseInt(mobile, 10),
      });
      navigate("/");
      setUserData(res.data);

      dispatch(login());
      console.log("The data:", res.data.user);

      if (res.data && res.data.user) {
        const user = res.data.user;
        setUserData(user);
        dispatch(login(user));

        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      alert("Failed to send OTP. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerifyOtp = async () => {
    // try {
    //   dispatch(setLoading(true));
    //   const res = await authService.verifyOtp({ mobile, otp });
    //   if (res?.data?.success) {
    //     dispatch(login(res.data.user._id));
    //     alert('Login successful!');
    //     navigate('/');
    //   } else {
    //     alert('Invalid OTP. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error verifying OTP:', error.response?.data || error.message);
    //   alert('Failed to login. Please try again.');
    // } finally {
    //   dispatch(setLoading(false));
    // }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h1>Log In with Mobile</h1>
        <p>Enter your mobile number to receive an OTP for login.</p>
        <form onSubmit={handleSendOtp}>
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            id="mobile"
            placeholder="Enter your mobile number"
            required
          />
          <button className="primary-btn" type="submit">
            Send OTP
          </button>
        </form>

        {/* {!isOtpSent ? (
          <form onSubmit={handleSendOtp}>
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              id="mobile"
              placeholder="Enter your mobile number"
              required
            />
            <button className="primary-btn" type="submit">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              id="otp"
              placeholder="Enter the OTP"
              required
            />
            <button className="primary-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </form>
        )} */}
        <div className="register">
          <p>
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithMobile;
