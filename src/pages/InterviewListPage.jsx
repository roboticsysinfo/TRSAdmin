import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import InterviewList from "../components/InterviewList";

const InterviewListPage = () => {

  return (
    
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title='Interview List' />

        <InterviewList />

      </MasterLayout>

    </>

  );

};

export default InterviewListPage;
