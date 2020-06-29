import React, { useState, useEffect } from 'react';
import DropMenuSelectUser from './DropMenuSelectUser';
import DropMenuSelectList from './DropMenuSelectList';

const CompareListsOfDifferentUsers = () => {
    const [firstUser, setFirtUser] = useState({});
    const [firstUserLists, setFirstUserLists] = useState([]);
    const [firstList, setFirstList] = useState({});

    // useEffect(() => {
    //     const fetchListsOfAnUser = async () => {
    //         const axiosInstance = axios.create({
    //             baseURL: process.env.REACT_APP_API_BASE_URL,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': getUserAccessToken(),
    //             }
    //         });
    //         const result = await axiosInstance.get(`/users/${firstUser.id}`);
    //         const listOfUsers = result.data.data;
    //         setFirstUserLists(listOfUsers);
    //     }
    //     fetchListsOfAnUser();
    // }, [firstUser]);

    return (
        <div className="auth-wrapper-table">
            <div className="auth-inner-table">
                <DropMenuSelectUser />
                <br />
                <DropMenuSelectUser />
            </div>
        </div>
    )
}

export default CompareListsOfDifferentUsers;