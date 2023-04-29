import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import TermOfServiceEditor from "@/components/editor/TermOfServiceEditor";

import React from "react";
import ApiReq from "@/util/axios";
import { withAuth } from "@/util/auth";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/website/termofservice");
  const error = response.data.ok ? false : response.data.message;

  return { props: { html: response.data.data.raw_html, error } };
});

const TermOfService = (props) => {
  return (
    <MainLayout>
      <PageLayout title="Term Of Service">
        <TermOfServiceEditor data={props.html} />
      </PageLayout>
    </MainLayout>
  );
};

TermOfService.requireAuth = true;

export default TermOfService;
