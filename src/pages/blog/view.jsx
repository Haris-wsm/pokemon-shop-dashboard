import BlogTable from "@/components/blog/BlogTable";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/blog");

  const error = response.data.ok ? false : response.data.message;

  return { props: { blogs: response.data.data, error } };
});

const BlogView = (props) => {
  if (props.error) return;

  console.log(props.blogs);

  return (
    <MainLayout>
      <PageLayout title="All Blog">
        <BlogTable blogs={props.blogs} />
      </PageLayout>
    </MainLayout>
  );
};

export default BlogView;
