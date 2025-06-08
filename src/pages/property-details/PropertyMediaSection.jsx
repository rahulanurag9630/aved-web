import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import { GiCheckedShield } from "react-icons/gi";
import {
  FaSwimmer,
  FaBasketballBall,
  FaGamepad,
  FaTshirt,
} from "react-icons/fa";
import {
  MdOutlineSecurity,
  MdOutlineDryCleaning,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { IoIosSnow } from "react-icons/io";
import PropertyCarousel from "../project/PropertyCarousel";

// const features = [
//   { label: "Air Conditioning", icon: <IoIosSnow size={18} /> },
//   { label: "Washer and dryer", icon: <MdOutlineDryCleaning size={18} /> },
//   { label: "Swimming Pool", icon: <FaSwimmer size={18} /> },
//   { label: "Basketball", icon: <FaBasketballBall size={18} /> },
//   { label: "24x7 Security", icon: <MdOutlineSecurity size={18} /> },
//   { label: "Central Air", icon: <GiCheckedShield size={18} /> },
//   { label: "Media Room", icon: <MdOutlineVideoLibrary size={18} /> },
//   { label: "Indoor Game", icon: <FaGamepad size={18} /> },
// ];

const PropertyMediaSection = ({ data }) => {
  const [lng, lat] = data?.location?.coordinates || [];
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;


  console.log(data)
  const features = data?.amenities?.map((item) => {
    return { label: item?.title, icon: <img src={item?.image} height={30} width={30} /> };
  });
  return (
    <Box mt={6}>
      {/* Preview Video */}
      <Box borderRadius={3} overflow="hidden" mb={6}>
        <Typography variant="h3" fontWeight={600} mb={3}>
          Preview Video
        </Typography>
        <Box
          style={{
            background: "#f3f5f5",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/QmfVLaBan5I"
            title="Modern Tropical House Design Perfection (3 Bedrooms - 236sqm/2540sqft)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
            picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
        </Box>
      </Box>

      {/* Features & Amenities */}
      <Typography variant="h3" fontWeight={600} mb={3}>
        Features & Amenities
      </Typography>
      <Grid container spacing={2}>
        {features.map((item, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Box className="displayStart" sx={{ gap: 1, alignItems: "center" }}>
              <span className="featuresItem">  {item.icon}</span>

              <Typography variant="body2">{item.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h3" fontWeight={600} mb={3} mt={6}>
        Location
      </Typography>

      <Box
        style={{ background: "#f3f5f5", padding: "20px", borderRadius: "8px" }}
      >
        <Typography fontWeight={400} mb={3} mt={6} sx={{ marginTop: "0 !important" }}>
          {data?.address || "NA"}
        </Typography>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            zIndex: "999",
            paddingTop: "30.25%", // 16:9 aspect ratio
            borderRadius: 2,
            boxShadow: 2,
          }}
        >

          {lat && lng && (
            <iframe
              src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
              width="100%"
              height="100%"
              style={{
                border: 0,
                position: "absolute",
                top: 0,
                left: 0,
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}

        </Box>
      </Box>
    </Box>
  );
};

export default PropertyMediaSection;
