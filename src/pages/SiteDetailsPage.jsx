import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SiteDetails from "../components/SiteDetails";


const SiteDetailsPage= () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Site Details" />

        <SiteDetails />

      </MasterLayout>
    </>
  );
};

export default SiteDetailsPage
