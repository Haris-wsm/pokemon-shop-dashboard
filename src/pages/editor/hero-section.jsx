import MainLayout from "@/components/layout/MainLayout";
import React from "react";

import ApiReq from "@/util/axios";
import { withAuth } from "@/util/auth";
import HeroSectionEditor from "@/components/editor/HeroSectionEditor";
import PageLayout from "@/components/layout/PageLayout";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/website/hero-section");
  const error = response.data.ok ? false : response.data.message;

  return { props: { html: response.data.data.raw_html, error } };
});

const HeroSection = (props) => {
  return (
    <MainLayout>
      <PageLayout title="Hero Section">
        <HeroSectionEditor data={props.html} />
      </PageLayout>
    </MainLayout>
  );
};

export default HeroSection;
