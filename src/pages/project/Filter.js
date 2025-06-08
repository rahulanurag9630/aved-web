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

export default function Filter({ setFilterData, filterOptions }) {
  const [formType, setFormType] = useState("quiry");
  const [filters, setFilters] = useState(filterOptions);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    setFilterData((prev) => ({ ...prev, [name]: value }))
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Filter Properties:", filters);
  };

  return (
    <>
      <Typography variant="h4" mt={5}>Search Property</Typography>
      <Box className="fiterproperty">
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Keyword..."
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
          <Grid item xs={12} md={2}>
            <Select
              fullWidth
              name="city"
              value={filters.city}
              onChange={handleInputChange}
              displayEmpty
              variant="outlined"
              placeholder="All Cities"
              type="search"
            >
              <MenuItem value="" disabled>
                All Cities
              </MenuItem>
              <MenuItem value="city1">City 1</MenuItem>
              <MenuItem value="city2">City 2</MenuItem>
              <MenuItem value="city3">City 3</MenuItem>
            </Select>
          </Grid>
          {/* <Grid item xs={12} md={2}>
            <Select
              fullWidth
              name="area"
              value={filters.area}
              onChange={handleInputChange}
              displayEmpty
              variant="outlined"
              placeholder="All Areas"
              type="search"
            >
              <MenuItem value="" disabled>
                All Areas
              </MenuItem>
              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
              <MenuItem value="other">Other</MenuItem>
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
              placeholder="Type"
              type="search"
            >
              <MenuItem value="" disabled>
                Type
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
              placeholder="Status"
              type="search"
            >
              <MenuItem value="" disabled>
                Status
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
                {open ? "Advanced" : "Advanced"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
              >
                Search
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
                  placeholder="Bedrooms"
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
                  placeholder="Bathrooms"
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
                  placeholder="Min. Area"
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
                  placeholder="Max. Area"
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
                  placeholder="Max. Price"
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
                  placeholder="Min. Price"
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