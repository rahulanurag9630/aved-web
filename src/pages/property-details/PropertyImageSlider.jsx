import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLocationDot } from "react-icons/fa6";
import i18n from "@/i18n";

const propertyImages = [
  "/images/Project/pro_1.jpg",
  "/images/Project/pro_2.jpg",
  "/images/Project/pro_3.jpg",
  "/images/Project/pro_4.jpg",
  "/images/Project/pro_1.jpg",
];

export default function PropertyImageSlider({ data }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const mainSlider = useRef();
  const thumbSlider = useRef();

  useEffect(() => {
    setNav1(mainSlider.current);
    setNav2(thumbSlider.current);
  }, []);

  const mainSettings = {
    asNavFor: nav2,
    ref: mainSlider,
    arrows: false,
    fade: true,
  };

  // Add this above your return to track the active index
  const [activeIndex, setActiveIndex] = useState(0);

  // Update thumbSettings to track slide change
  const thumbSettings = {
    asNavFor: nav1,
    ref: thumbSlider,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: false,
    arrows: false,
    beforeChange: (current, next) => setActiveIndex(next),
  };

  return (
    <Box>
      {/* Main Slider */}
      <Box mb={2}>
        <Typography variant="h3" fontWeight={600}>
          {i18n.language === "en" ? data?.property_name : data?.property_name_ar || "NA"}
        </Typography>
        <Box className="displayStart">
          <FaLocationDot style={{ color: "#000000a8" }} />
          <Typography variant="body2" color="#000000a8" fontWeight={600}>
            {i18n.language === "en" ? data?.address : data?.address_ar || data?.address}
          </Typography>
        </Box>
      </Box>
      <Slider {...mainSettings}>
        {data?.images?.map((img, i) => (
          <Box key={i}>
            <CardMedia
              component="img"
              height="450"
              image={img}
              alt={`Main Property ${i + 1}`}
              sx={{ borderRadius: 2, width: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <Box mt={2}>
        <Slider {...thumbSettings}>
          {data?.images?.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <Box
                key={i}
                sx={{
                  borderRadius: 2,
                  border: isActive
                    ? "2px solid orange"
                    : "2px solid transparent",
                  bgcolor: "#fff",
                  transition: "0.3s",
                }}
                className="thumbbottomIng"
              >
                <Box
                  component="img"
                  height={120}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  sx={{
                    borderRadius: 1,
                    cursor: "pointer",
                    // border: isActive ? "2px solid #5c4d44" : "2px solid transparent",
                    width: "100%",
                    objectFit: "cover",
                    opacity: isActive ? "1" : "0.5",
                    "&:hover": !isActive && {
                      opacity: "1",
                      // border: "2px solid #5c4d44",
                    },
                    "@media(max-width:767px)": {
                      height: "60px !important",
                    }
                  }}
                />
              </Box>
            );
          })}
        </Slider>
      </Box>

      <Box mt={5}>
        <Typography
          variant="body2"
          color="#404040"
          dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? data?.detailed_description : data?.detailed_description_ar }}
        />
      </Box>

    </Box>
  );
}
