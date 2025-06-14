import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";
import AppContext from "@/context/AppContext";
import HomeLayout from "@/layout/HomeLayout";
import { apiRouterCall } from "@/api-services/service";

const PrivacyComponent = styled("Box")(({ theme }) => ({
  "& .privacyMainBox": {},
  "& h6": {
    lineHeight: "30px",
  }
}));

export default function PrivacyPolicy() {
  const auth = useContext(AppContext);
  const [termsData, setTermsData] = useState("");

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Terms & Conditions");
    }

    const fetchTerms = async () => {
      const res = await apiRouterCall({
        endPoint: "getStaticContentByType",
        paramsData: { contentType: "privacyPolicy" },
      });
      console.log(res)
      if (res?.data?.responseCode === 200) {
        setTermsData(res.data.result?.docs[0]);
      }
    };

    fetchTerms();
  }, [auth?.topHeading]);
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Terms & Conditions");
    }
  }, [auth?.topHeading]);
  return (
    <PrivacyComponent>
      <Box mb={3} className="termBoxmain">
        <Container>
          <Typography variant="h3" color="#fff">
            Privacy Policy
          </Typography>

          <Typography variant="body2" color="#FFFFFF" mt={1}>
            Last Updates : {termsData?.createdAt}
          </Typography>
        </Container>
      </Box>
      <Container style={{ marginBottom: "50px" }}>
        <Typography variant="h6" dangerouslySetInnerHTML={{ __html: termsData?.description }}
          color="primary" dan mb={2}>

        </Typography>


      </Container>
    </PrivacyComponent>
  );
}
PrivacyPolicy.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
