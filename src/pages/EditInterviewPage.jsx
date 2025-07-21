import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditInterview from "../components/EditInterview";

const EditInterviewPage = () => {

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title='Edit Interview' />

        <EditInterview />

      </MasterLayout>

    </>

  );

};

export default EditInterviewPage;
