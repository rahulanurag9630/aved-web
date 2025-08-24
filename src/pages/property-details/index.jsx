import HomeLayout from "@/layout/HomeLayout";
import {
  Grid,
  Container,
  Box,
  styled,
  Typography,
  CircularProgress,
} from "@mui/material";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import PropertyImageSlider from "./PropertyImageSlider";
import Overview from "./Overview";
import PropertyMediaSection from "./PropertyMediaSection";
import PropertyCarousel from "../project/PropertyCarousel";
import FloorPlanTabs from "./FloorPlanTabs";
import { apiRouterCall } from "@/api-services/service";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Landmarks from "./LandmarkTabs";
import i18n from "@/i18n";
import Client from "./Client";
import BedroomTabs from "./BedroomsTab";
import BathroomTabs from "./BathroomsTabs";

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: 1,
    zIndex: "999",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/Project/pro_det.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
    paddingBottom: "90px",
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "50px",
      paddingTop: "100px",
    },
  },
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));

export default function PropertyDetails() {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();
  const { propertyId } = router.query;

  const getProperties = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "POST",
        endPoint: "getPropertyById",
        bodyData: router.query,
      });

      if (res?.data?.responseCode === 200) {
        setProperty(res?.data?.result || []);
      } else {
        setProperty([]);
        console.log("Error response:", res);
      }
    } catch (error) {
      setProperty([]);
      console.error("Error while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      getProperties();
    }
  }, [propertyId]);

  return (
    <>
      <Head>
        <title>{property?.seo_meta_titles || t("seoTitleFallback")} | YourSiteName</title>
        <meta name="description" content={property?.overview} />
      </Head>
      <AboutUSBox>
        <Box className="aboutBannerImage">
          <Container style={{ position: "relative", zIndex: "999" }}>
            <Box className="headingBox">
              <Typography variant="h1" color="#fff">
                {i18n.language === "en" ? property?.property_name : property?.property_name_ar}
              </Typography>
            </Box>

            <Box
              className=" displaySpacebetween"
              style={{ alignItems: "end", flexWrap: "wrap" }}
              pb={5}
            >
              <Box className="displayStart" gap="15px">
                <Typography
                  variant="h6"
                  color="#FFFFFF99"
                  sx={{ cursor: "pointer", fontWeight: "600" }}
                  onClick={() => router.push("/")}
                >
                  {t("home")}
                </Typography>

                <Typography
                  variant="h6"
                  color="#FFFFFF99"
                  sx={{ cursor: "pointer", fontWeight: "600" }}
                  onClick={() => router.push("/blog")}
                >
                  {t("breadcrumbPropertyDetails")}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                color="#FFFFFF99"
                style={{ maxWidth: "400px" }}
              >
                {t("breadcrumbDescription")}
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* 🔄 Show loader while loading */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Container maxWidth="lg" className="propert-details">
            <PropertyImageSlider data={property} />
            <Overview data={property} />
            <PropertyMediaSection data={property} />
            <FloorPlanTabs data={property} />
            {/* <BedroomTabs data={property} />
              <BathroomTabs data={property} /> */}

            <Client clientData={property.partners} brochure={property.brochure} />
            <Box mt={6}>
              <Typography variant="h3" fontWeight={600} gutterBottom mb={3}>
                {t("relatedListings")}
              </Typography>
              <PropertyCarousel />
            </Box>
          </Container>
        )}
      </AboutUSBox>
    </>
  );
}

PropertyDetails.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};