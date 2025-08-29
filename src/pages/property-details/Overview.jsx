import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import {
  MdOutlineConfirmationNumber,
  MdOutlineBed,
  MdOutlineBathroom,
  MdOutlineApartment,
  MdOutlineCalendarToday,
  MdOutlineCropSquare,
} from "react-icons/md";
import { useTranslation } from "react-i18next";

const Overview = ({ data }) => {
  const { t } = useTranslation();

  const details = [
    {
      label: t("numberId"),
      value: data?.apartment_number,
      icon: <MdOutlineConfirmationNumber size={24} color="rgb(92 77 68)" />,
    },
    {
      label: t("type"),
      value: data?.property_type,
      icon: <MdOutlineApartment size={24} color="rgb(92 77 68)" />,
    },
    {
      label: t("buildYear"),
      value: data?.year_of_built,
      icon: <MdOutlineCalendarToday size={24} color="rgb(92 77 68)" />,
    },
    {
      label: t("bed"),
      value: data?.no_of_bedrooms,
      icon: <MdOutlineBed size={24} color="rgb(92 77 68)" />,
    },
    {
      label: t("bath"),
      value: data?.no_of_bathrooms,
      icon: <MdOutlineBathroom size={24} color="rgb(92 77 68)" />,
    },
    {
      label: t("size"),
      value: data?.area_sqft ? `${data.area_sqft} m²` : null,
      icon: <MdOutlineCropSquare size={24} color="rgb(92 77 68)" />,
    },
  ];

  const filteredDetails = details.filter(
    (item) => item.value !== null && item.value !== undefined && item.value !== ""
  );

  if (filteredDetails.length === 0) return null;

  return (
    <Box my={5}>
      <Typography variant="h3" fontWeight={600} mb={3}>
        {t("overview")}
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
        {data?.brochure && (
          <Box mt={6}>
            <Typography variant="h5" color={"#000"} gutterBottom fontWeight={600}>
              {t("brochure_title") || " Brochure"}
            </Typography>
            <Button
              variant="contained"
              href={data?.brochure}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                // backgroundColor: "#2D2E83",
                // color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.2,
                fontSize: "15px",
                textTransform: "none",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                "&:hover": {
                  // backgroundColor: "#1e1f66",
                },
              }}
            >
              📄
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Overview;
