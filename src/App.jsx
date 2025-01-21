import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import Home from "./pages/Home";
import AllCategory from "./pages/AllCategory";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { Box } from "@mui/material";
import ScrollToTop from "./utils/ScrollToTop";
import { useSelector } from "react-redux";
import useReactFontLoader from 'react-font-loader';
import FeaturedProduct from "./pages/Products/FeaturedProduct";
import Account from "./pages/Account";

// Lazy-loaded components
const Category = lazy(() => import("./pages/Category"));
const SingleCategory = lazy(() => import("./pages/Category/components/SingleCategory"));
const SingleProduct = lazy(() => import("./pages/Products/SingleProducts"));
const SingleVendor = lazy(() => import("./pages/Vendors/components/SingleVendor"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Bookings = lazy(() => import("./pages/Bookings"));
const AboutUs = lazy(() => import("./pages/About"));

// PrivateRoute Component
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// PublicRoute Component
const PublicRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/signup" />;
};

function App() {
  const loading = useSelector((state) => state.loader.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  useReactFontLoader({
    url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  });


  return (
    <BrowserRouter>
      <Loading loading={loading} />
      <ScrollToTop />
      <PageHeader />
      <Box style={{ paddingTop: "4.5rem" }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={
                // <PublicRoute isAuthenticated={isAuthenticated}>
                  <Signup />
                // </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                // <PublicRoute isAuthenticated={isAuthenticated}>
                  <Login />
                // </PublicRoute>
              }
            />
            <Route path="/about" element={<AboutUs />} />

            {/* Protected Routes */}
            <Route
              path="/category/:category"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Category />
                </PrivateRoute>
              }
            />
            <Route
              path="/category/:category/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <SingleCategory />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AllCategory />
                </PrivateRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Bookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/Featuredproducts"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <FeaturedProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <SingleProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/vendors"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Vendors />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/vendors/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <SingleVendor />
                </PrivateRoute>
              }
            />
              <Route
              path="/account"
              element={
                // <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Account />
                // </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
