"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "next-i18next";

export default function Filter({ setFilterData, filterOptions }) {
  const { t } = useTranslation();
  const [formType, setFormType] = useState("quiry");
  const [filters, setFilters] = useState(filterOptions);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Filter Properties:", filters);
  };

  return (
    <>
      <Typography variant="h4" mt={5}>{t("search_property")}</Typography>
      <Box className="fiterproperty">
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t("enter_keyword")}
              name="keyword"
              value={filters.keyword}
              onChange={handleInputChange}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={2}>
            <Select
              fullWidth
              name="city"
              value={filters.city}
              onChange={handleInputChange}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                {t("all_cities")}
              </MenuItem>
              <MenuItem value="city1">City 1</MenuItem>
              <MenuItem value="city2">City 2</MenuItem>
              <MenuItem value="city3">City 3</MenuItem>
            </Select>
          </Grid> */}

          <Grid item xs={12} md={2}>
            <Select
              fullWidth
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                {t("type")}
              </MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Plot">Plot</MenuItem>
              <MenuItem value="Hotel">Hotel</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={2} sm={6}>
            <Select
              fullWidth
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                {t("status")}
              </MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className="displayStart" style={{ gap: "10px" }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="displayCenter"
                startIcon={<SettingsIcon />}
                onClick={() => setOpen(!open)}
              >
                {t("advanced")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
              >
                {t("search")}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Collapse in={open}>
          <Box style={{ width: "100%", marginTop: "10px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2.4} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("bedrooms")}
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("bathrooms")}
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("min_area")}
                  name="minArea"
                  value={filters.minArea}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("max_area")}
                  name="maxArea"
                  value={filters.maxArea}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("max_price")}
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("min_price")}
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}