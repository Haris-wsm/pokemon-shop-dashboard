import BlogForm from "@/components/blog/Form";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { withAuth } from "@/util/auth";
import React from "react";

const BlogCrator = () => {
  return (
    <MainLayout>
      <PageLayout title="New Blog"></PageLayout>
      <BlogForm />
    </MainLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  return {
    props: {},
  };
});

export default BlogCrator;
