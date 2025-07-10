import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import StatusManager from "../components/StatusManager";


const StatusPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Manage Statues" />

        {/* AvatarLayer */}
        <StatusManager />


      </MasterLayout>
    </>
  );
};

export default StatusPage;
