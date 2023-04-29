import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import ProductTable from "@/components/product/ProductTable";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/products");

  const error = response.data.ok ? false : response.data.message;

  return { props: { propducts: response.data.data, error } };
});

const ViewAllProducts = (props) => {
  if (props.error) return;

  return (
    <MainLayout>
      <PageLayout title="รายการสินค้า">
        <ProductTable products={props.propducts} />
      </PageLayout>
    </MainLayout>
  );
};

ViewAllProducts.requireAuth = true;

export default ViewAllProducts;
