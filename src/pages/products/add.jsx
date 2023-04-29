import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import AddProductForm from "@/components/product/AddProductForm";
import { withAuth } from "@/util/auth";
import React from "react";

const ProductAdd = () => {
  return (
    <MainLayout title="Add Product">
      <PageLayout title="เพิ่มสินค้า">
        <AddProductForm />
      </PageLayout>
    </MainLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  return {
    props: {},
  };
});

export default ProductAdd;
