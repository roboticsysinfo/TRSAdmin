import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import VerifiedStoriesList from "../components/VerifiedStoriesList";


const VerfiedStoriesPage = () => {

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Verfied Stories" />

        <VerifiedStoriesList />


      </MasterLayout>
    </>
  );

};

export default VerfiedStoriesPage;
