import FormEdit from "@/components/blog/FormEdit";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const { slug } = context.query;
  const response = await ApiReq.get(`/api/blog/${slug}`);

  const error = response.data.ok ? false : response.data.message;
  return { props: { blog: response.data.data, error } };
});

export const EditBlog = (props) => {
  const { query } = useRouter();
  return (
    <MainLayout>
      <PageLayout title={query.slug}>
        <FormEdit blog={props.blog} />
      </PageLayout>
    </MainLayout>
  );
};

export default EditBlog;
