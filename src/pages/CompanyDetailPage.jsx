import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CompanyDetail from "../components/CompanyDetail";


const CompanyDetailPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Company Details" />

        <CompanyDetail />


      </MasterLayout>
    </>
  );
};

export default CompanyDetailPage;
