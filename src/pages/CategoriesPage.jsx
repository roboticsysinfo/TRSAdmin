import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Categories from "../components/Categories";


const CategoriesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Categories" />

        <Categories />


      </MasterLayout>
    </>
  );
};

export default CategoriesPage;
