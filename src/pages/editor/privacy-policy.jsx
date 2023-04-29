import PrivacyPolicyEditor from "@/components/editor/PrivacyPolicyEditor";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/website/privacy-policy");
  const error = response.data.ok ? false : response.data.message;

  return { props: { html: response.data.data.raw_html, error } };
});

const PrivacyPolicy = (props) => {
  return (
    <MainLayout>
      <PageLayout title="Privacy Policy">
        <PrivacyPolicyEditor data={props.html} />
      </PageLayout>
    </MainLayout>
  );
};

export default PrivacyPolicy;
