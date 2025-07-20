import { apiRouterCall } from "@/api-services/service";
import HomeLayout from "@/layout/HomeLayout";
import { Box, Container, Typography, Divider, styled } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: "999",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/blog_bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
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

export default function BlogDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiRouterCall({
          method: "GET",
          endPoint: "getBlogById",
          paramsData: { id },
        });

        if (res?.data?.responseCode === 200 && res?.data?.result) {
          setBlog(res.data.result);
        } else {
          setError(res?.data?.responseMessage || "Blog not found.");
        }
      } catch (error) {
        setError("Error fetching blog data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return <Typography align="center" mt={10}>{t("loading")}</Typography>;
  }

  if (error || !blog) {
    return (
      <Typography align="center" mt={10} color="error.main">
        {error || t("noBlogFound")}
      </Typography>
    );
  }

  return (
    <>
      <AboutUSBox>
        <Box className="aboutBannerImage">
          <Container style={{ position: "relative", zIndex: "999" }}>
            <Box className="headingBox">
              <Typography variant="h1" color="#fff">
                {t("recentArticles")}
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
                  {t("blogDetails")}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                color="#FFFFFF99"
                style={{ maxWidth: "400px" }}
              >
                {t("blogSubtitle")}
              </Typography>
            </Box>
          </Container>
        </Box>
      </AboutUSBox>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {new Date(blog.createdAt).toLocaleDateString(
            i18n.language === "ar" ? "ar-EG" : "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </Typography>

        <Typography variant="h3" color="#5c4d44" fontWeight="bold" gutterBottom>
          {i18n.language === "en" ? blog.title : blog.title_ar}
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 400,
            borderRadius: 2,
            overflow: "hidden",
            my: 3,
          }}
        >
          <Image
            src={blog.image || "/images/Project/pro_1.jpg"}
            alt={i18n.language === "en" ? blog.title : blog.title_ar}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 600px) 100vw, 100vw"
          />
        </Box>

        <Typography
          variant="body2"
          color="#000000ad"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{
            __html:
              i18n.language === "en"
                ? blog.description
                : blog.description_ar,
          }}
        ></Typography>

        <Divider sx={{ my: 4 }} />
      </Container>
    </>
  );
}

BlogDetail.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
