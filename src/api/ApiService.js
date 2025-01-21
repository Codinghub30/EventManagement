import api from './api.js';
import { config } from './config.js';

const authService = {
  // User Authentication & Profile
  registerUser: (payload) => api.post(config.USER_REGISTER, payload),
  loginUser: (payload) => api.post(config.USER_LOGIN, payload),
  getUserProfile: (userId) => api.get(`${config.GET_USER_PROFILE}${userId}`),
  updateUserProfile: (userId, data) => api.put(`${config.UPDATE_VENDOR_PROFILE}${userId}`, data),
  addAddress: (data) => api.post(config.ADD_ADDRESS, data),

  // Order Management
  createOrder: (data) => api.post(config.CREATE_ORDER, data),
  getOrder: (orderId) => api.get(`${config.GET_ORDER_BY_ORDER_ID}${orderId}`),
  cancelOrder: (orderId) => api.put(`${config.CANCEL_ORDER}${orderId}`),
  rescheduleOrder: (orderId, data) => api.put(`${config.RESCHEDULE_ORDER}${orderId}`, data),

  // Product Section 
  rentalProduct: () => api.get(`${config.GET_RENTAL_PRODUCTS}`),
  relatedRentalProduct: (category) => api.get(`${config.GET_RENTAL_PRODUCTS}?category=${category}?limit=4`),
  singleProduct: (id) => api.get(`${config.GET_SINGLE_PRODUCT}${id}`),

  // Services 
  getServices:() => api.get(`${config.GET_ALL_SERVICE}`),

  // Featured section 
  featuredProducts: () => api.get(`${config.GET_FEATURED_PRODUCTS}?limit=4`),
  allFeaturedProducts: () => api.get(`${config.GET_FEATURED_PRODUCTS}`),

  // Faq section 
  getFaq: () => api.get(`${config.GET_ALL_FAQ}`),

  //  Review section
  reviewProduct: (payload, productId) => api.put(`${config.WRITE_A_REVIEW}${productId}`, payload),
  getReview: (productId) => api.get(`${config.GET_REVIEW}${productId}`),

  // Vendor Section 
  vendorLists: () => api.get(`${config.GET_ALL_PRODUCT_VENDOR}`),
  getVendorProfile: (vendorId) => api.get(`${config.GET_VENDOR_PROFILE}${vendorId}`),
  getParticularVendorProduct: (vendorId) => api.get(`${config.GET_PARTICULAR_VENDOR_PRODUCTS}/${vendorId}`),
  writeVendorReview: (payload, vendorId) => api.put(`${config.WRITE_VENDORS_REVIEW}${vendorId}`,payload),

  // Banner
  getYoutube: () => api.get(`${config.GET_YOUTUBE_VIDEO_LINK}`),
  getAllBanner: () => api.get(`${config.GET_ALL_BANNERS}`),
  getAllTechnicians: () => api.get(`${config.GET_ALL_TECHNICIAN}`),



};

export default authService;
