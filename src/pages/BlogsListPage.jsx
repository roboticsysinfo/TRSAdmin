import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BlogList from "../components/BlogList";


const BlogsListPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Blogs" />

                <BlogList />

            </MasterLayout>
        </>
    );
};


export default BlogsListPage;
