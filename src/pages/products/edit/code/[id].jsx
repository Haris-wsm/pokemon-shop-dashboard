import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import CodeManage from "@/components/product/CodeManage";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const { id } = context.query;
  const response = await ApiReq.get(`/api/products/${id}/codes`);
  const error = response.data.ok ? false : response.data.message;

  return {
    props: { error, data: response.data.data },
  };
});

const EditProductCode = (props) => {
  if (props.error) return;

  return (
    <MainLayout>
      <PageLayout title="แก้ไขรหัสโค้ด">
        <CodeManage data={props.data} />
      </PageLayout>
    </MainLayout>
  );
};

EditProductCode.requireAuth = true;

export default EditProductCode;
