import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import ApiReq from "@/util/axios";
import React from "react";

import ProductDetail from "@/components/product/ViewProduct";
import { withAuth } from "@/util/auth";

export const getServerSideProps = withAuth(async (context) => {
  const { id } = context.query;
  const response = await ApiReq.get(`/api/products/${id}`);

  const error = response.data.ok ? false : response.data.message;
  return { props: { product: response.data.data, error } };
});

const ViewProduct = (props) => {
  if (props.error) return;

  return (
    <MainLayout>
      <PageLayout title="รายละเอียดสินค้า">
        <ProductDetail product={props.product} />
      </PageLayout>
    </MainLayout>
  );
};

export default ViewProduct;
