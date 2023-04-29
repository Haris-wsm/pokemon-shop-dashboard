import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import EditProductForm from "@/components/product/EditProductForm";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const { id } = context.query;

  const response = await ApiReq.get(`/api/products/${id}`);
  const error = response.data.ok ? false : response.data.message;
  return { props: { product: response.data.data, error } };
});

const EditProduct = (props) => {
  if (props.error) return;

  return (
    <MainLayout>
      <PageLayout title="แก้ไขสินค้า">
        <EditProductForm product={props.product} />
      </PageLayout>
    </MainLayout>
  );
};

EditProduct.requireAuth = true;

export default EditProduct;
