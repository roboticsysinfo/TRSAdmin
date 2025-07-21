import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddInterview from "../components/AddInterview";

const AddInterviewPage = () => {

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title='Add Interview' />

        <AddInterview />

      </MasterLayout>

    </>

  );

};

export default AddInterviewPage;
