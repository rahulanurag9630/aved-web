import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, CardMedia, Typography, Tabs, Tab } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLocationDot } from "react-icons/fa6";
import i18n from "@/i18n";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VirtualTourModal from "./VirtualTourModal";

import { useTranslation } from "react-i18next";
export default function PropertyImageSlider({ data }) {
  const { t } = useTranslation()
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const mainSlider = useRef();
  const thumbSlider = useRef();

  // Tabs state -> 0: images, 1: interior, 2: exterior
  const [tabIndex, setTabIndex] = useState(0);

  // Virtual tour modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCloseTour = () => {
    setIsOpen(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

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

  const [activeIndex, setActiveIndex] = useState(0);

  const thumbSettings = {
    asNavFor: nav1,
    ref: thumbSlider,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    beforeChange: (current, next) => setActiveIndex(next),
  };

  // Helper: get current images based on active tab
  const getCurrentImages = () => {
    if (tabIndex === 1) return data?.interiorDesign || [];
    if (tabIndex === 2) return data?.exteriorDesign || [];
    return data?.images || [];
  };

  const currentImages = getCurrentImages();

  return (
    <Box>
      {/* Title & Address */}
      <Box mb={2}>
        <Typography variant="h3" fontWeight={600}>
          {i18n.language === "en"
            ? data?.property_name
            : data?.property_name_ar || "NA"}
        </Typography>
        <Box className="displayStart">
          <FaLocationDot style={{ color: "#000000a8" }} />
          <Typography variant="body2" color="#000000a8" fontWeight={600}>
            {i18n.language === "en"
              ? data?.address
              : data?.address_ar || data?.address}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(e, val) => setTabIndex(val)}
        sx={{
          mb: 2, "& .MuiTab-root": {
            color: "#000",
          },
          "& .Mui-selected": {
            color: "#fff !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#fff",
          },
        }}
      >
        {data?.images?.length > 0 && <Tab label={i18n.language === "ar" ? "الصور" : "Images"} />}
        {data?.interiorDesign?.length > 0 && <Tab label={i18n.language === "ar" ? "التصميم الداخلي" : "Interior Design"} />}
        {data?.exteriorDesign?.length > 0 && <Tab label={i18n.language === "ar" ? "التصميم الخارجي" : "Exterior Design"} />}
      </Tabs>

      {/* Main Slider */}
      <Slider {...mainSettings}>
        {currentImages?.map((img, i) => (
          <Box key={i} sx={{ position: "relative" }}>
            {/* Virtual Tour only for main property images */}
            {tabIndex === 0 && data?.virtualTour && (
              <Box
                onClick={() => setIsOpen(true)}
                sx={{
                  marginLeft: "2px",
                  cursor: "pointer",
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                }}
                p={1}
              >
                <PlayCircleIcon fontSize="small" />
                <Typography variant="body2" ml={0.5}>
                  Virtual tour
                </Typography>
              </Box>
            )}

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
      {currentImages?.length > 1 && (
        <Box mt={2}>
          <Slider {...thumbSettings}>
            {currentImages?.map((img, i) => {
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
                >
                  <Box
                    component="img"
                    height={120}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    sx={{
                      borderRadius: 1,
                      cursor: "pointer",
                      width: "100%",
                      objectFit: "cover",
                      opacity: isActive ? "1" : "0.5",
                      "&:hover": !isActive && {
                        opacity: "1",
                      },
                      "@media(max-width:767px)": {
                        height: "60px !important",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Slider>
        </Box>
      )}

      {/* Description */}
      {tabIndex === 0 && (
        <Box mt={5}>
          <Typography
            variant="body2"
            color="#404040"
            dangerouslySetInnerHTML={{
              __html:
                i18n.language === "en"
                  ? data?.detailed_description
                  : data?.detailed_description_ar,
            }}
          />
        </Box>
      )}

      {/* Virtual Tour Modal */}
      <VirtualTourModal
        isOpen={isOpen}
        handleCloseTour={handleCloseTour}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        virtualTour={data?.virtualTour}
      />
    </Box>
  );
}
