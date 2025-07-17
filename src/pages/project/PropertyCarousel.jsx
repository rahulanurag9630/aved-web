import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Grid,
  Container,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { IoBedOutline, IoCarOutline } from "react-icons/io5";
import { TbBath, TbBallAmericanFootball } from "react-icons/tb";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { apiRouterCall } from "@/api-services/service";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

// Global Loader Component
const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <CircularProgress size={60} color="primary" />
    <Typography variant="h6" color="text.secondary">
      Loading Properties...
    </Typography>
  </Box>
);

// No Properties Component
const NoProperties = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      margin: "20px 0",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <Typography variant="h5" color="text.secondary" fontWeight="500">
      No Properties Available
    </Typography>
  </Box>
);

// Property Card Component
const PropertyCard = ({ property }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation()

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const hasImages = Array.isArray(property.images) && property.images.length > 0;
  const hasPrice = property?.price_min && property?.price_max;

  return (
    <Grid item xs={12} sm={6} md={6} style={{ cursor: "pointer" }}>
      <Box sx={{ position: "relative" }}>
        {hasImages && (
          <Carousel responsive={responsive} infinite autoPlay={false} autoPlaySpeed={3000}>
            {property.images.map((img, i) => (
              <Box key={i}>
                <CardMedia
                  component="img"
                  height="320"
                  image={img}
                  alt={`${property.property_name} image ${i + 1}`}
                  sx={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Carousel>
        )}

        {property.listing_type && (
          <span className={`featureText ${property.listing_type === "Sale" ? "saleText" : ""}`}>
            {i18n.language === "ar" ? (
              property.listing_type === "Sale"
                ? "للبيع"
                : property.listing_type === "Rent"
                  ? "للايجار"
                  : "مميز"
            ) : (
              property.listing_type === "Sale"
                ? "For Sale"
                : property.listing_type === "Rent"
                  ? "Rent"
                  : "Featured"
            )}
          </span>
        )}

      </Box>

      <CardContent
        onClick={() =>
          router.push({ pathname: `/property-details`, query: { propertyId: property?._id } })
        }
        style={{
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          marginTop: "-4px",
        }}
      >
        {property.property_name && (
          <Typography variant="h6" color="#222222" fontWeight="500">
            {i18n.language === "en" ? property.property_name : property.property_name_ar}
          </Typography>
        )}

        <Box className="displaySpacebetween" style={{ gap: "10px" }}>
          {hasPrice && (
            <Typography
              variant="h5"
              color="primary"
              className="propertyprice"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <img
                src="/images/currency.svg"
                alt="currency"
                style={{ width: 20, height: 20, objectFit: 'contain' }}
              />
              {property.price_min.toLocaleString()} - {property.price_max.toLocaleString()}
            </Typography>

          )}

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {property.no_of_bedrooms > 0 && (
              <Box display="flex" alignItems="center" gap={1}>
                <IoBedOutline style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.no_of_bedrooms}
                </Typography>
              </Box>
            )}

            {property.no_of_bathrooms > 0 && (
              <Box display="flex" alignItems="center" gap={1}>
                <TbBath style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.no_of_bathrooms}
                </Typography>
              </Box>
            )}

            {property.parking_space && (
              <Box display="flex" alignItems="center" gap={1}>
                <IoCarOutline style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.parking_space === "Yes" ? "1" : "0"}
                </Typography>
              </Box>
            )}

            {property.area_sqft && (
              <Box display="flex" alignItems="center" gap={1}>
                <TbBallAmericanFootball style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.area_sqft} {t("sqft")}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Grid>
  );
};


const PropertyCarousel = ({ filterOptions }) => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    page: 1,
    pages: 1,
  });

  const parseNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };

  const getProperties = async (page = 1) => {
    try {
      setLoading(true);

      const {
        keyword,
        city,
        area,
        type,
        status,
        bedrooms,
        bathrooms,
        minArea,
        maxArea,
        minPrice,
        maxPrice,
      } = filterOptions || {};

      // Only include non-empty, non-zero, non-undefined values in params
      const paramsData = {
        limit: 10,
        page,
      };

      if (keyword && keyword.trim() !== "") paramsData.search = keyword;
      if (city && city.trim() !== "") paramsData.city = city;
      if (type && type.trim() !== "") paramsData.property_type = type;
      if (status && status.trim() !== "") paramsData.availability_status = status;
      if (bedrooms && parseNumber(bedrooms) > 0) paramsData.no_of_bedrooms = parseNumber(bedrooms);
      if (bathrooms && parseNumber(bathrooms) > 0) paramsData.no_of_bathrooms = parseNumber(bathrooms);
      if (minPrice && parseNumber(minPrice) > 0) paramsData.min_price = parseNumber(minPrice);
      if (maxPrice && parseNumber(maxPrice) > 0) paramsData.max_price = parseNumber(maxPrice);
      if (minArea && parseNumber(minArea) > 0) paramsData.min_area_sqft = parseNumber(minArea);
      if (maxArea && parseNumber(maxArea) > 0) paramsData.max_area_sqft = parseNumber(maxArea);

      const res = await apiRouterCall({
        method: "GET",
        endPoint: "listPropertiesUser",
        paramsData,
      });

      if (res?.data?.responseCode === 200) {
        setProperties(res.data.result.docs || []);
        setPagination({
          total: res.data.result.total || 0,
          limit: res.data.result.limit || 10,
          page: res.data.result.page || 1,
          pages: res.data.result.pages || 1,
        });
      } else {
        setProperties([]);
        console.log("Error response:", res);
      }
    } catch (error) {
      setProperties([]);
      console.error("Error while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, [filterOptions]);

  const handlePageChange = (event, value) => {
    getProperties(value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : properties.length === 0 ? (
        <NoProperties />
      ) : (
        <>
          <Grid container spacing={10}>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </Grid>
          <Box mt={5} className="dislayCenter">
            {pagination.pages > 1 &&
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
              />}
          </Box>
        </>
      )}
    </>
  );
};

export default PropertyCarousel;