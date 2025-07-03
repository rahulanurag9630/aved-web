import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const PropertyMediaSection = ({ data }) => {
  const [lng, lat] = data?.location?.coordinates || [];
  const hasLocation = lat && lng;

  const hasVideo = !!data?.videoUrl;
  const hasAddress = !!data?.address;

  const features = Array.isArray(data?.amenities)
    ? data.amenities
      .filter((item) => item?.title && item?.image)
      .map((item) => ({
        label: item.title,
        icon: <img src={item.image} alt={item.title} height={30} width={30} />,
      }))
    : [];

  return (
    <Box mt={6}>
      {/* Preview Video */}
      {hasVideo && (
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
              src={data.videoUrl}
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: "8px" }}
              loading="lazy"
              title="Property Preview Video"
            ></iframe>
          </Box>
        </Box>
      )}

      {/* Features & Amenities */}
      {features.length > 0 && (
        <>
          <Typography variant="h3" fontWeight={600} mb={3}>
            Features & Amenities
          </Typography>
          <Grid container spacing={2}>
            {features.map((item, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <Box className="displayStart" sx={{ gap: 1, alignItems: "center" }}>
                  <span className="featuresItem">{item.icon}</span>
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Location Map */}
      {hasAddress || hasLocation ? (
        <>
          <Typography variant="h3" fontWeight={600} mb={3} mt={6}>
            Location
          </Typography>
          <Box style={{ background: "#f3f5f5", padding: "20px", borderRadius: "8px" }}>
            {hasAddress && (
              <Typography fontWeight={400} mb={3}>
                {data.address}
              </Typography>
            )}
            {hasLocation && (
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  zIndex: "999",
                  paddingTop: "30.25%", // 16:9 ratio
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
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
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                ></iframe>
              </Box>
            )}
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default PropertyMediaSection;
