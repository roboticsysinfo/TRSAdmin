import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import StartupStoriesList from "../components/StartupStoriesList";

const StartupStoriesPage = () => {
    return (

        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='All Startup Stories' />

                <StartupStoriesList />

            </MasterLayout>
        </>

    );
};

export default StartupStoriesPage;
