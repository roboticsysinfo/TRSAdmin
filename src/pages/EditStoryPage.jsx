import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditStory from "../components/EditStory";


const EditStoryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Story" />

        <EditStory />


      </MasterLayout>
    </>
  );
};

export default EditStoryPage;
