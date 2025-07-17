import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditCompany from "../components/EditCompany";

const EditCompanyPage = () => {
    return (

        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Company' />

                <EditCompany />

            </MasterLayout>
        </>

    );
};

export default EditCompanyPage;
