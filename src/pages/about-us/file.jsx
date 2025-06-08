
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const PropertyFilterDropdown = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({
        propertyType: [],
        bedroom: [],
        priceRange: { min: "", max: "" },
        availability: [],
    });
    const dropdownRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutside = Object.values(dropdownRefs.current).every(
                (ref) => ref && !ref.contains(event.target)
            );
            if (isOutside) setOpenDropdown(null);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (key) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const handleCheckboxChange = (category, value) => {
        setSelectedOptions((prev) => {
            const current = prev[category] || [];
            if (current.includes(value)) {
                return { ...prev, [category]: current.filter((item) => item !== value) };
            }
            return { ...prev, [category]: [...current, value] };
        });
    };

    const handlePriceChange = (type, value) => {
        if (/^\d*$/.test(value)) {
            setSelectedOptions((prev) => ({
                ...prev,
                priceRange: { ...prev.priceRange, [type]: value },
            }));
        }
    };

    const handleSearch = () => {
        console.log("Selected Filters:", selectedOptions);
    };

    const clearSelection = (category) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [category]: category === "priceRange" ? { min: "", max: "" } : [],
        }));
    };

    const propertyTypes = [
        "Apartment",
        "Plot",
        "Hotel",
        "Townhouse",
        "Office",
        "Villa",
    ];
    const bedrooms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"];
    const availabilityStatus = ["Available", "Sold", "Under Offer", "Reserved"];

    const getDisplayText = (category) => {
        if (category === "priceRange") {
            const { min, max } = selectedOptions.priceRange;
            if (min && max) return `AED ${min} - ${max}`;
            if (min) return `Min AED ${min}`;
            if (max) return `Max AED ${max}`;
            return "Any";
        }
        return selectedOptions[category]?.length
            ? selectedOptions[category].join(", ")
            : "Any";
    };

    return (
        <Container maxWidth="lg" sx={{ padding: { xs: 1, sm: 2 } }}>
            <Box
                className="filterContainer"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: { xs: 1, sm: 2 },
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    padding: { xs: "10px", sm: "15px" },
                    margin: "0 auto",
                }}
            >
                {/* Property Type */}
                <Box
                    className="dropdownWrapper"
                    ref={(el) => (dropdownRefs.current["propertyType"] = el)}
                    sx={{ flex: { xs: "1 1 45%", sm: "1 1 22%", md: "1 1 18%" }, minWidth: { xs: "120px", sm: "150px" }, position: "relative" }}
                >
                    <Box
                        className="dropdownHeader"
                        onClick={() => toggleDropdown("propertyType")}
                        sx={{
                            padding: { xs: "8px", sm: "10px" },
                            border: "none",
                            borderRight: { xs: "none", sm: "1px solid #e0e0e0" },
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                    color: "#666",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                }}
                            >
                                Property Type
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    color: "#000",
                                    fontWeight: 600,
                                }}
                            >
                                {getDisplayText("propertyType")}
                            </Typography>
                        </Box>
                        <Box className="arrow">
                            {openDropdown === "propertyType" ? (
                                <IoIosArrowUp style={{ fontSize: "1rem", color: "#666" }} />
                            ) : (
                                <IoIosArrowDown style={{ fontSize: "1rem", color: "#666" }} />
                            )}
                        </Box>
                    </Box>
                    {openDropdown === "propertyType" && (
                        <Box
                            className="dropdownContent"
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: "4px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                background: "#fff",
                                width: "100%",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Grid container spacing={1}>
                                {propertyTypes.map((type, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <input
                                                type="checkbox"
                                                className="customCheckbox"
                                                checked={selectedOptions.propertyType.includes(type)}
                                                onChange={() => handleCheckboxChange("propertyType", type)}
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                            <Typography variant="body1" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                                {type}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                onClick={() => clearSelection("propertyType")}
                                sx={{
                                    marginTop: 1,
                                    textTransform: "none",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: "#666",
                                }}
                            >
                                Clear Selection
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Bedroom */}
                <Box
                    className="dropdownWrapper"
                    ref={(el) => (dropdownRefs.current["bedroom"] = el)}
                    sx={{ flex: { xs: "1 1 45%", sm: "1 1 22%", md: "1 1 18%" }, minWidth: { xs: "120px", sm: "150px" }, position: "relative" }}
                >
                    <Box
                        className="dropdownHeader"
                        onClick={() => toggleDropdown("bedroom")}
                        sx={{
                            padding: { xs: "8px", sm: "10px" },
                            border: "none",
                            borderRight: { xs: "none", sm: "1px solid #e0e0e0" },
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                    color: "#666",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                }}
                            >
                                Bedroom
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    color: "#000",
                                    fontWeight: 600,
                                }}
                            >
                                {getDisplayText("bedroom")}
                            </Typography>
                        </Box>
                        <Box className="arrow">
                            {openDropdown === "bedroom" ? (
                                <IoIosArrowUp style={{ fontSize: "1rem", color: "#666" }} />
                            ) : (
                                <IoIosArrowDown style={{ fontSize: "1rem", color: "#666" }} />
                            )}
                        </Box>
                    </Box>
                    {openDropdown === "bedroom" && (
                        <Box
                            className="dropdownContent"
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: "4px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                background: "#fff",
                                width: "100%",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Grid container spacing={1}>
                                {bedrooms.map((bedroom, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <input
                                                type="checkbox"
                                                className="customCheckbox"
                                                checked={selectedOptions.bedroom.includes(bedroom)}
                                                onChange={() => handleCheckboxChange("bedroom", bedroom)}
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                            <Typography variant="body1" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                                {bedroom}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                onClick={() => clearSelection("bedroom")}
                                sx={{
                                    marginTop: 1,
                                    textTransform: "none",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: "#666",
                                }}
                            >
                                Clear Selection
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Price Range */}
                <Box
                    className="dropdownWrapper"
                    ref={(el) => (dropdownRefs.current["priceRange"] = el)}
                    sx={{ flex: { xs: "1 1 45%", sm: "1 1 22%", md: "1 1 18%" }, minWidth: { xs: "120px", sm: "150px" }, position: "relative" }}
                >
                    <Box
                        className="dropdownHeader"
                        onClick={() => toggleDropdown("priceRange")}
                        sx={{
                            padding: { xs: "8px", sm: "10px" },
                            border: "none",
                            borderRight: { xs: "none", sm: "1px solid #e0e0e0" },
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                    color: "#666",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                }}
                            >
                                Price Range
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    color: "#000",
                                    fontWeight: 600,
                                }}
                            >
                                {getDisplayText("priceRange")}
                            </Typography>
                        </Box>
                        <Box className="arrow">
                            {openDropdown === "priceRange" ? (
                                <IoIosArrowUp style={{ fontSize: "1rem", color: "#666" }} />
                            ) : (
                                <IoIosArrowDown style={{ fontSize: "1rem", color: "#666" }} />
                            )}
                        </Box>
                    </Box>
                    {openDropdown === "priceRange" && (
                        <Box
                            className="dropdownContent"
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: "4px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                background: "#fff",
                                width: "100%",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" mb={0.5} sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                        Min Price (AED)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={selectedOptions.priceRange.min}
                                        onChange={(e) => handlePriceChange("min", e.target.value)}
                                        placeholder="0"
                                        type="text"
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                        sx={{ "& .MuiInputBase-input": { padding: "8px", fontSize: "0.9rem" } }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" mb={0.5} sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                        Max Price (AED)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={selectedOptions.priceRange.max}
                                        onChange={(e) => handlePriceChange("max", e.target.value)}
                                        placeholder="0"
                                        type="text"
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                        sx={{ "& .MuiInputBase-input": { padding: "8px", fontSize: "0.9rem" } }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                onClick={() => clearSelection("priceRange")}
                                sx={{
                                    marginTop: 1,
                                    textTransform: "none",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: "#666",
                                }}
                            >
                                Clear Selection
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Availability Status */}
                <Box
                    className="dropdownWrapper"
                    ref={(el) => (dropdownRefs.current["availability"] = el)}
                    sx={{ flex: { xs: "1 1 45%", sm: "1 1 22%", md: "1 1 18%" }, minWidth: { xs: "120px", sm: "150px" }, position: "relative" }}
                >
                    <Box
                        className="dropdownHeader"
                        onClick={() => toggleDropdown("availability")}
                        sx={{
                            padding: { xs: "8px", sm: "10px" },
                            border: "none",
                            borderRight: { xs: "none", sm: "1px solid #e0e0e0" },
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                    color: "#666",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                }}
                            >
                                Availability
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    color: "#000",
                                    fontWeight: 600,
                                }}
                            >
                                {getDisplayText("availability")}
                            </Typography>
                        </Box>
                        <Box className="arrow">
                            {openDropdown === "availability" ? (
                                <IoIosArrowUp style={{ fontSize: "1rem", color: "#666" }} />
                            ) : (
                                <IoIosArrowDown style={{ fontSize: "1rem", color: "#666" }} />
                            )}
                        </Box>
                    </Box>
                    {openDropdown === "availability" && (
                        <Box
                            className="dropdownContent"
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: "4px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                background: "#fff",
                                width: "100%",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Grid container spacing={1}>
                                {availabilityStatus.map((status, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <input
                                                type="checkbox"
                                                className="customCheckbox"
                                                checked={selectedOptions.availability.includes(status)}
                                                onChange={() => handleCheckboxChange("availability", status)}
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                            <Typography variant="body1" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                                {status}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                onClick={() => clearSelection("availability")}
                                sx={{
                                    marginTop: 1,
                                    textTransform: "none",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: "#666",
                                }}
                            >
                                Clear Selection
                            </Button>
                        </Box>
                    )}
                </Box>

                <div
                    className="dropdownWrapper"
                // ref={(el) => (dropdownRefs.current["community"] = el)}
                >
                    <Button variant="contained" onClick={handleSearch}
                        color="primary" className="serchCustom">
                        Search Properties
                    </Button>
                </div>
            </Box>
        </Container>
    );
};

export default PropertyFilterDropdown;