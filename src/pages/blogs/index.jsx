"use client";
import React, { useEffect, useState } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Grid, Container, Box, styled, Typography } from "@mui/material";
import BlogCard from "./BlogCard";
import { apiRouterCall } from "@/api-services/service";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: 1,
    zIndex: "999",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/About/about-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
    paddingBottom: "150px",
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "47px",
      paddingTop: "113px",
    },
  },
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));

export default function Blog() {
  const { t } = useTranslation();
  const router = useRouter();
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await apiRouterCall({
          method: "GET",
          endPoint: "listPublicBlogs",
          requireAuth: false,
        });

        if (
          res?.data?.responseCode === 200 &&
          Array.isArray(res?.data?.result?.docs)
        ) {
          setBlogData(res?.data?.result?.docs || []);
        } else {
          console.error("Failed to fetch blogs:", res?.data?.responseMessage);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  function formatDate(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (isNaN(date)) return "";

    const day = date.getDate().toString().padStart(2, "0");

    const monthNamesEn = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthNamesAr = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    const monthNames = i18n.language === "ar" ? monthNamesAr : monthNamesEn;
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }


  return (
    <AboutUSBox>
      <Box className="aboutBannerImage">
        <Container style={{ position: "relative", zIndex: "999" }}>
          <Box className="headingBox">
            <Typography variant="h1" color="#fff">
              {t("newsUpdates")}
            </Typography>
          </Box>

          <Box
            className="displaySpacebetween"
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
                {t("blog")}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              color="#FFFFFF99"
              style={{ maxWidth: "400px" }}
            >
              {t("blogBannerDescription")}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {blogData.length > 0 ? (
            blogData.map((blog, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <BlogCard
                  image={i18n.language === "en" ? blog.image : blog.image_ar || "/images/Project/pro_1.jpg"}
                  title={i18n.language === "en" ? blog.title : blog.title_ar}
                  date={formatDate(blog.createdAt)}
                  description={i18n.language === "en" ? blog.description : blog.description_ar}
                  slug={blog.slug}
                  id={blog._id}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textSecondary">
                {t("noBlogPosts")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </AboutUSBox>
  );
}

Blog.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
