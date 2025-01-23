import React from "react";
import Slider from "react-slick";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import Featured from "../../pages/Home/components/Featured/index";
import ExploreService from "../../pages/Home/components/ExploreService/index";
import NearVendor from "../../pages/Home/components/NearVendor/index";
import Details from "../../pages/Home/components/Details/index";
import ExploreCategory from "../../pages/Home/components/ExploreCategory/index";
import Gallery from "./components/Gallery";
import Faq from "./components/Faq";
import "./styles.scss";
import Party from "../../assets/party.png";
import Trusted from "./components/Trusted";
const cardsData = [
  {
    title: "Love Bazaar",
    subtitle: "09 February 2025, Ecoworld, Bellandur",
    buttonText: "Book Now",
    image:
      "https://st2.depositphotos.com/1355276/12001/i/450/depositphotos_120011984-stock-photo-overcrowded-live-concert-audience-at.jpg",
  },
  {
    title: "Born Social Club",
    subtitle: "Win Tickets to Coolest Scenes",
    buttonText: "Sign Up Now",
    image:
      "https://st2.depositphotos.com/1355276/12001/i/450/depositphotos_120011984-stock-photo-overcrowded-live-concert-audience-at.jpg",
  },
  {
    title: "Russell Howard Live 2025",
    subtitle: "9th Feb 2025, Good Shepherd Auditorium",
    buttonText: "Book Now",
    image:
      "https://st2.depositphotos.com/1297731/8246/i/450/depositphotos_82461376-stock-photo-crowd-at-concert.jpg",
  },
  {
    title: "Art and Culture Festival",
    subtitle: "Explore Bengaluru's Creativity",
    buttonText: "Learn More",
    image: Party,
  },
  {
    title: "Music Concert",
    subtitle: "Feel the Rhythm of the City",
    buttonText: "Book Now",
    image:
      "https://st2.depositphotos.com/1297731/8246/i/450/depositphotos_82461376-stock-photo-crowd-at-concert.jpg",
  },
];

const Home = () => {
  const sliderSettings = {
    dots: true, // Show dots
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of visible cards
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Auto-scroll speed
    arrows: true, // Disable arrows
  };

  return (
    <>
      <Box
        sx={{ backgroundColor: "#0c172f", minHeight: "55vh", padding: "20px" }}
      >
        {/* Header */}

        <Box
          sx={{
            marginTop: "30px",
            backgroundColor: "#0c172f",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Slider {...sliderSettings}>
            {cardsData.map((card, index) => (
              <Box key={index} sx={{ padding: "10px", marginTop: "2rem" }}>
                <Card
                  sx={{
                    minWidth: "300px",
                    flex: "0 0 auto",
                    backgroundColor: "#1a2d4b",
                    color: "white",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                    borderRadius: "10px",
                    textAlign: "center",
                    marginTop: "2rem",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      <ExploreCategory />
      <Trusted />
      <Featured />
      <ExploreService />
      {/* <Gallery /> */}
      <NearVendor />
      <Details />
      <Faq />
    </>
  );
};

export default Home;
