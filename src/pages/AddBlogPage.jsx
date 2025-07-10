import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreateBlog from "../components/CreateBlog";

const AddBlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Add New Blog' />

        <CreateBlog />

      </MasterLayout>
    </>
  );
};

export default AddBlogPage;
