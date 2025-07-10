import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditBlog from "../components/EditBlog";

const EditBlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Edit Blog' />

        <EditBlog />

      </MasterLayout>
    </>
  );
};

export default EditBlogPage;
