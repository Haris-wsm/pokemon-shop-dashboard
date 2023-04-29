import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";

import { Divider } from "@mui/material";
import AddNewCategory from "@/components/category/AddNewCategory";
import TableCategory from "@/components/category/TableCategory";
import ApiReq from "@/util/axios";
import { withAuth } from "@/util/auth";

export const getServerSideProps = withAuth(async (context) => {
  try {
    const res = await ApiReq.get(`/api/categories`);
    const { data } = res.data;

    // Return the data as props
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Failed to fetch data from API",
      },
    };
  }
});

const Catergories = (props) => {
  // Handle error page later

  return (
    <MainLayout>
      <PageLayout title="ประเภทสินค้า">
        <AddNewCategory />
        <Divider className="my-10 w-4/5 mx-auto" />
        <TableCategory data={props.data} />
      </PageLayout>
    </MainLayout>
  );
};

Catergories.requireAuth = true;

export default Catergories;
