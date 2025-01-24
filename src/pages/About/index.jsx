import React, { useEffect, useState } from "react";
import AboutMain from "../../assets/AboutMain.jpg";
import "./styles.scss";
import { Box } from "@mui/material";
import Testimonials from "./components/Testimonials";
import { useLocation } from "react-router-dom";
import Achievements from "./components/Achievements";
import authService from "../../api/ApiService";

const About = () => {
  const [banner, setBanner] = useState("");
  const location = useLocation();
  const getBanner = async () => {
    const res = await authService.getAllBanner();
    setBanner(res.data.data[0]);
  };
  useEffect(() => {
    getBanner();
  }, []);
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -400;
        const yPosition =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <section className="about-us">
      <div className="about-header">
        <Box className="about-header-content">
          <h1>We are Event Rentals Company with a Mission!</h1>
          <p className="about-header-">
            Are you looking to host an event full of flair and class? You’ve
            found the experts. We make every occasion unforgettable.
          </p>
          <div className="services">
            <div className="service">
              <Box className="service-image">
                <img
                  className="about-icons"
                  src="https://cdn-icons-png.flaticon.com/512/5360/5360277.png"
                  alt="Not found"
                />
              </Box>
              <Box className="about-service-content">
                <h3>Event Rentals</h3>
                <p className="about-header-para">
                  High-quality tables, decor, and props for every occasion.
                </p>
              </Box>
            </div>
            <div className="service">
              <Box className="service-image">
                <img
                  className="about-icons"
                  src="https://cdn-icons-png.flaticon.com/512/5360/5360277.png"
                  alt="Not found"
                />
              </Box>
              <Box className="about-service-content">
                <h3>Corporate Events</h3>
                <p className="about-header-para">
                  Perfect setups for meetings, conferences, and company
                  gatherings.
                </p>
              </Box>
            </div>
            <div className="service">
              <Box className="service-image">
                <img
                  className="about-icons"
                  src="https://cdn-icons-png.flaticon.com/512/5360/5360277.png"
                  alt="Not found"
                />
              </Box>
              <Box className="about-service-content">
                <h3>Booth Design</h3>
                <p className="about-header-para">
                  Creative and functional booths tailored to your brand.
                </p>
              </Box>
            </div>
          </div>
        </Box>
        <img className="aboutMain" src={AboutMain} alt="Not found" />
      </div>

      <div className="team">
        <h2>Professional Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img
              src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250"
              alt="Alex Valentine"
            />
            <h3>Alex Valentine</h3>
            <p>Event Director</p>
          </div>
          <div className="team-member">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlXZlMguDa-0yDfWZbxjbWqSu4TCEK8d-gEDkQWIUK3Ox1Sx2VnDyYy6oKpWjw0ALTXY&usqp=CAU"
              alt="John Harris"
            />
            <h3>John Harris</h3>
            <p>Project Manager</p>
          </div>
          <div className="team-member">
            <img
              src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
              alt="Jessica Jane"
            />
            <h3>Jessica Jane</h3>
            <p>Creative Lead</p>
          </div>
          <div className="team-member">
            <img
              src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg"
              alt="Alex Valtaz"
            />
            <h3>Alex Valtaz</h3>
            <p>Logistics Manager</p>
          </div>
        </div>
      </div>
      <Testimonials />
      <div className="banner">
        <img src={banner.banner_image} alt="Decorated Event Setup" />
      </div>
      <Achievements />
    </section>
  );
};

export default About;
