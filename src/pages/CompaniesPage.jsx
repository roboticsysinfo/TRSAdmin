import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CompaniesList from "../components/CompaniesList";


const CompaniesPage = () => {

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Companies" />

        <CompaniesList />

      </MasterLayout>
    </>
  );
  
};

export default CompaniesPage;
