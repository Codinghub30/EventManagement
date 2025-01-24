// React and react related imports
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Third party library
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

// Custom Components
import CustomSort from "./components/CustomSort";
import "./styles.scss";
import authService from "../../api/ApiService";
import { setLoading } from "../../redux/slice/LoaderSlice";
import { getErrorMessage } from "../../utils/helperFunc";

const Category = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories] = useState([
    "All",
    "Sound",
    "Genset",
    "Video",
    "Lighting",
    "Fabrication",
    "Shamiana",
  ]);
  const [activeCategory, setActiveCategory] = useState(category || "All");
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      dispatch(setLoading(true));
      const res = await authService.rentalProduct();
      if (res.data.data && res.data.data.length > 0) {
        setData(res.data.data);
        console.log(res.data.data);

        dispatch(setLoading(false));
      } else {
        setData([]);
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      getErrorMessage(error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const filtered = category
        ? data.filter(
            (item) =>
              item.product_category.toLowerCase() === category.toLowerCase()
          )
        : data;
      setFilteredItems(filtered);
      setActiveCategory(category || "All");
    }
  }, [data, category]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePriceFilter = () => {
    let filtered = data;

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.product_category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (item) =>
          (!minPrice || item.product_price >= parseFloat(minPrice)) &&
          (!maxPrice || item.product_price <= parseFloat(maxPrice))
      );
    }

    setFilteredItems(filtered);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    if (option === "newest") {
      sortedItems.sort((a, b) => b.id - a.id);
    } else if (option === "priceLowToHigh") {
      sortedItems.sort(
        (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
      );
    } else if (option === "priceHighToLow") {
      sortedItems.sort(
        (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
      );
    }

    setFilteredItems(sortedItems);
  };

  const handleSearch = () => {
    let filtered = data.filter((item) =>
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.product_category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (item) =>
          (!minPrice || item.product_price >= parseFloat(minPrice)) &&
          (!maxPrice || item.product_price <= parseFloat(maxPrice))
      );
    }

    setFilteredItems(filtered);
  };

  const handleOpen = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Box className="category-page">
      <Box className="filters-sidebar-category">
        <Typography variant="h6" className="filters-title">
          Filters
        </Typography>

        <Box className="filter-group">
          <Typography variant="subtitle1">Price</Typography>
          <TextField
            type="number"
            placeholder="Min"
            size="small"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input"
          />
          <TextField
            type="number"
            placeholder="Max"
            size="small"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input"
          />
          <Button
            variant="contained"
            className="category-apply"
            onClick={handlePriceFilter}
            sx={{ marginTop: "1rem" }}
          >
            Apply
          </Button>
        </Box>

        <Box className="filter-group">
          <Typography variant="subtitle1">Search</Typography>
          <TextField
            placeholder="Search by name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Box>

        <CustomSort onSortChange={handleSortChange} />
      </Box>

      {/* Main Content */}
      <Box className="main-content">
        <Typography variant="h6">
          Showing {filteredItems.length} results
        </Typography>

        <Box className="products-grid">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="product-card"
              onClick={() => handleOpen(item._id)}
            >
              <img
                src={item.product_image[0]}
                alt={item.product_name}
                className="product-image"
              />
              <CardContent>
                <Typography variant="h6">{item.product_name}</Typography>
                <Typography
                  className="rating"
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  <Box className="Rating-point">
                    <Typography variant="p" className="Rating-container">
                      {item.Reviews?.length > 0
                        ? (
                            item.Reviews.reduce(
                              (acc, review) => acc + review.ratings,
                              0
                            ) / item.Reviews.length
                          ).toFixed(1)
                        : 0}{" "}
                      ⭐
                    </Typography>

                    <Typography className="Rating-num">
                      {item.Reviews?.length || 0} Rating
                      {item.Reviews?.length === 1 ? "" : "s"}
                    </Typography>
                  </Box>
                </Typography>
                <Typography>₹{item.product_price}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
