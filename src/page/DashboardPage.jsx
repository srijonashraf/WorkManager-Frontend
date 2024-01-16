import React, { useEffect } from 'react';
import ProfileStore from "../store/Employee/ProfileStore.js";
import WorkStore from "../store/Work/WorkStore.js";
import Dashboard from "../components/Dashboard/Dashboard.jsx";

const DashboardPage = () => {
    const {
        WorkStatusCountIndividualRequest,
        WorkStatusCountIndividual
    } = WorkStore();
    const {
        ProfileDetailsRequest,
        ProfileDetails

    } = ProfileStore();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await WorkStatusCountIndividualRequest();
    //             await ProfileDetailsRequest();
    //             console.log('Frontend: Data fetched successfully from Dashboard Page');
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default DashboardPage;