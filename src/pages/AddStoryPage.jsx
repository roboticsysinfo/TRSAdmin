import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddStory from "../components/AddStory";

const AddStoryPage = () => {
    return (

        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Add Startup Stories, Success Stories & Interesting Stories' />

                <AddStory />

            </MasterLayout>
        </>

    );
};

export default AddStoryPage;
