import AboutUsEditor from "@/components/editor/AboutUsEditor";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/website/aboutus");
  const error = response.data.ok ? false : response.data.message;

  return { props: { html: response.data.data.raw_html, error } };
});

const AboutUs = (props) => {
  return (
    <MainLayout>
      <PageLayout title="About Us">
        <AboutUsEditor data={props.html} />
      </PageLayout>
    </MainLayout>
  );
};

export default AboutUs;
