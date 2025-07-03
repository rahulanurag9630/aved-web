import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  MdOutlineConfirmationNumber,
  MdOutlineBed,
  MdOutlineBathroom,
  MdOutlineApartment,
  MdOutlineCalendarToday,
  MdOutlineCropSquare,
} from "react-icons/md";

const Overview = ({ data }) => {
  const details = [
    {
      label: "Number ID",
      value: data?.apartment_number,
      icon: <MdOutlineConfirmationNumber size={24} color="rgb(92 77 68)" />,
    },
    {
      label: "Type",
      value: data?.property_type,
      icon: <MdOutlineApartment size={24} color="rgb(92 77 68)" />,
    },
    {
      label: "Build Year",
      value: data?.year_of_built,
      icon: <MdOutlineCalendarToday size={24} color="rgb(92 77 68)" />,
    },
    {
      label: "Bed",
      value: data?.no_of_bedrooms,
      icon: <MdOutlineBed size={24} color="rgb(92 77 68)" />,
    },
    {
      label: "Bath",
      value: data?.no_of_bathrooms,
      icon: <MdOutlineBathroom size={24} color="rgb(92 77 68)" />,
    },
    {
      label: "Size",
      value: data?.apartment_number ? `${data.apartment_number} sqft` : null,
      icon: <MdOutlineCropSquare size={24} color="rgb(92 77 68)" />,
    },
  ];

  // Filter out details with no value
  const filteredDetails = details.filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      item.value !== ""
  );

  // Don't render the section if nothing is available
  if (filteredDetails.length === 0) return null;

  return (
    <Box my={5}>
      <Typography variant="h3" fontWeight={600} mb={3}>
        Overview
      </Typography>
      <Paper
        elevation={0}
        sx={{ borderRadius: 3, p: 3, backgroundColor: "#f3f5f5" }}
      >
        <Grid container spacing={3}>
          {filteredDetails.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                <span className="property-single-info__icon">
                  {item.icon}
                </span>
                <Box>
                  <Typography variant="body2" fontWeight={500} color="#000">
                    {item.label}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600} color="#777">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Overview;
