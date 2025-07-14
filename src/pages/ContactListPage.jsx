import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ContactList from "../components/ContactList";

const ContactListPage = () => {
    return (

        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Contacts List' />

                <ContactList />

            </MasterLayout>
        </>

    );
};

export default ContactListPage;
