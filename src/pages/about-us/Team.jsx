import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";
import TeamCard from "./TeamCard";
import { apiRouterCall } from "@/api-services/service";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const TeamSection = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await apiRouterCall({
          method: "GET",
          endPoint: "publicList",
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

    fetchTeam();
  }, []);

  return (
    <Container className="main-sectionGap">
      <Box align="center" className="subSection">
        <Typography variant="h2" style={{ textTransform: "uppercase" }}>
          {t("board_heading")}
        </Typography>
      </Box>
      <div
        style={{
          display: "grid",
          gap: "30px",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
        className="teamGridBox"
      >
        {blogData && blogData.length > 0 ? (
          blogData.map((member) => (
            <TeamCard
              key={member._id}
              role={i18n.language === "en" ? member.name : member.name_ar || "N/A"}
              name={i18n.language === "en" ? member.position : member.position_ar || "N/A"}
              description={i18n.language === "en" ? member.thoughts : member.thoughts_ar || "N/A"}
              image={member.image || "/images/default-team.png"} // fallback image if not present
              facebook={member?.facebook}
              instagram={member?.instagram}
              linkedin={member?.linkedin}
            />
          ))
        ) : (
          <>
            <TeamCard
              role="Dr. Mohanad Naeem AlShaikh"
              name="Chairman of the Board of Directors"
              description="“Our passion lies in curating spaces that define luxury and innovation, creating lifestyles that transcend the ordinary.”"
              image="/images/Team/1.jpg"
            />
            <TeamCard
              role="Mr. Hasan Habib Saber"
              name="Executive Chairman"
              description="“With each new development, we shape more than just skylines; but the future of the real estate industry.”"
              image="/images/Team/2.jpg"
            />
            <TeamCard
              role="Eng. Abdullah Saleh Binladin"
              name="Chairman of the Audit and Review Committee"
              description="“Through diligent oversight, we ensure that all our endeavors resonate with integrity, precision, and excellence.”"
              image="/images/Team/3.jpg"
            />
            <TeamCard
              role="Mr. Khalid Naeem AlShaikh"
              name="Executive Vice President"
              description="“We believe in crafting environments that reflect our clients' aspirations, offering both luxury and authenticity.”"
              image="/images/Team/4.jpg"
            />
            <TeamCard
              role="Mr. Ghaith Saleh Binladin"
              name="Chairman of the Investment Committee"
              description="“Driven by a shared vision, we strive not only to maximize returns but to leave a mark wherever we venture.”"
              image="/images/Team/5.png"
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default TeamSection;