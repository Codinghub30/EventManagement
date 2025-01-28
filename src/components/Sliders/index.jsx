import { Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import MainImage from "../../assets/AboutMain.jpg";
import "./styles.scss";

const cardsData = [
  {
    title: "Make Your Event is Simple Now",
    subtitle:
      "Make your event planing stress-free. Streamline every detail with ease. Focus on what truly matters - Celebrating !",
    buttonText: "Book Now",
    image: MainImage,
  },
  {
    title: "Plan with Ease, Celebrate in Style",
    subtitle:
      "Effortlessly manage every detail of your event. Let us take care of the stress while you focus on creating unforgettable memories.",
    buttonText: "Book Now",
    image: MainImage,
  },
  {
    title: "Bring Your Event Vision to Life",
    subtitle:
      "Whether it's a wedding, party, or corporate gathering, we ensure your event shines and your guests are amazed.",
    buttonText: "Sign Up",
    image:
      "https://images.squarespace-cdn.com/content/v1/55c37beae4b0336075603f86/1443039469134-E9SLQBQ2OW1Y69KPKFDO/image-asset.jpeg?format=2500w",
  },
  {
    title: "Your Event, Perfectly Crafted",
    subtitle:
      "From concept to execution, experience flawless event management for an unforgettable celebration.",
    buttonText: "Book Now",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwaA8j3JXCUJK6s0E139bWxzBDGcLkBaAaZBUycCpQo-9_9JZf99E2r7QQrTKS7qyNNmk&usqp=CAU",
  },
];
const Sliders = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };
  return (
    <>
      <Box>
        <Slider {...sliderSettings}>
          {cardsData.map((card, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: "2rem",
                overflow: "hidden",
                height: "450px",
              }}
            >
              {/* Image */}
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(90%)",
                }}
              />

              {/* Overlay Content */}
              <Box className="Home-overlay-text">
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "1.5rem",
                    maxWidth: "600px",
                    lineHeight: "1.5",
                  }}
                >
                  {card.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "0.5rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default Sliders;
