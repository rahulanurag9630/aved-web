import React, { useState } from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ProjectSlider from "./ProjectSlider";
import HomeLayout from "@/layout/HomeLayout";
import PropertyCarousel from "./PropertyCarousel";
import { Container } from "@mui/material";
import Filter from "./Filter";



const LandingPage = styled("Box")(({ theme }) => ({
  position: "relative",
}));

export default function Project() {
  const { t } = useTranslation();
  const router = useRouter();
  const filterData = router.query;
  const [filterOptions, setFilterOptions] = useState({
    keyword: "",
    city: "",
    area: "",
    type: filterData?.property_type || "",
    status: filterData?.status || "",
    bedrooms: filterData?.no_of_bedrooms || "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
    minPrice: filterData?.min_price || "",
    maxPrice: filterData?.max_price || "",
  } || {})

  console.log(filterData)

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <LandingPage>

      <ProjectSlider />
      <Container>
        <Filter setFilterData={setFilterOptions} filterOptions={filterOptions} />
        <PropertyCarousel filterOptions={filterOptions} />
      </Container>

    </LandingPage>
  );
}

Project.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
