import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import StoryRequestList from "../components/StoryRequestList";

const StoryRequestPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Story Requests' />

            <StoryRequestList />

      </MasterLayout>
    </>
  );
};

export default StoryRequestPage;
