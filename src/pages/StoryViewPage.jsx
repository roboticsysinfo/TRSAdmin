import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import StoryView from "../components/StoryView";


const StoryViewPage = () => {

  return (

    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Story' />

        <StoryView />

      </MasterLayout>

    </>

  );

};

export default StoryViewPage;
