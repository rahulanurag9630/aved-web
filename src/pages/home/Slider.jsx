import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollAnimation from "react-animate-on-scroll";
import { apiRouterCall } from "@/api-services/service";
import { useRouter } from "next/router";

const bannerData = {
  desktop: [
    {
      image: "/images/Slider/banner_1.jpg",
      heading: "Grand Polo Club & Resort",
      description: "Equestrian Opulence, Beyond Imagination.",
    },
    {
      image: "/images/Slider/banner_2.jpg",
      heading: "Grand Polo Club & Resort",
      description: "Equestrian Opulence, Beyond Imagination.",
    },
    {
      image: "/images/Slider/banner_3.jpg",
      heading: "Albero at Dubai Creek Harbour",
      description: "Unfold a New Life",
    },
    {
      image: "/images/Slider/banner_4.jpg",
      heading: "Golf Verge at Emaar South",
      description: "Unfold a New Life",
    },
    {
      image: "/images/Slider/banner_5.jpg",
      heading: "Albero at Dubai Creek Harbour",
      description: "Unfold a New Life",
    },
  ],
};

const sliderSettings = {
  arrows: false,
  dots: true,
  infinite: true,
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1300,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const Slider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("api call start")
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "listPropertiesUser",
        paramsData: {
          limit: 5,
          page: 1,
        },
      });

      console.log(res);

      if (res?.data?.responseCode === 200) {
        setData(res?.data?.result?.docs || []);
        // Uncomment the line below if routing is needed after successful API call
        // router.push("/project");
      } else {
        console.log("Error response:", res);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("apicall form effect ")
    handleSearch();
  }, []);

  const renderSlides = (images) =>
    images.map((item, index) => (
      <Box className="bannerBox" key={index} sx={{ position: "relative" }}>
        <img
          src={item?.images?.[0]} // Adjust this line based on your bannerData structure
          alt={`Slide ${index + 1}`}
          className="sliderBannerImg"
          width="100%"
          height="750"
        />

        {/* <Box className="gradientOverlay" /> */}

        <Container>
          <Box className="slide-caption">
            <img
              src="/images/Slider/GP-LOGO-2.png"
              width="151px"
              height="40px"
              className="slideTopLogo"
            />
            <img
              src="/images/Slider/NEWLY_LAUNCHED_EN.svg"
              alt="Newly Launched"
              width="163px"
              height="28px"
              className="slide-badge"
            />
            <ScrollAnimation animateIn="slideInUp">
              <Typography
                variant="h2"
                color="#fff"
                className="bannerHeadingText"
              >
                {item?.property_name}
              </Typography>
              <Typography
                variant="body2"
                mt={1}
                color="#fff"
                className="bannerDescriptionText"
              >
                {item?.overview}
              </Typography>
            </ScrollAnimation>
            <Button variant="contained" color="primary">
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
    ));

  return (
    <Box className="sliderHomepage" style={{ position: "relative", zIndex: "999" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SlickSlider {...sliderSettings}>
            {renderSlides(data)}
          </SlickSlider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Slider;
