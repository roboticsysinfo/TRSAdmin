import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CompanyRequest from "../components/CompanyRequest";

const CompanyListRequestPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Request for Company Listing' />

            <CompanyRequest />

      </MasterLayout>
    </>
  );
};

export default CompanyListRequestPage;
