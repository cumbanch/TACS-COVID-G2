import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserAccessToken } from '../../../session-managment/utils';
// ControlledTreeView imports
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import MyTreeItem from '../MyTreeItem2';

// ControlledTreeView
const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

// CompareListsOfDifferentUsers
const fetchUsers = async () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getUserAccessToken(),
        }
    });
    const response = await axiosInstance.get('/users?page=1&limit=100&order_column=id&order_type=ASC');
    const listOfUsers = response.data.data;
    return listOfUsers;
}

const CompareListsOfDifferentUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const axiosInstance = axios.create({
                baseURL: process.env.REACT_APP_API_BASE_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getUserAccessToken(),
                }
            });
            const response = await axiosInstance.get('/users?page=1&limit=100&order_column=id&order_type=ASC');
            const listOfUsers = response.data.data;
            setUsers(listOfUsers);
        }
        fetchUsers();
    }, []
    );

    // START - ControlledTreeViewLEFT
    const classes = useStyles();
    const [expandedLeft, setExpandedLeft] = useState([]);
    const [selectedLeft, setSelectedLeft] = useState([]);
    const [userLists, setUserLists] = useState([]);

    const handleToggleLeft = (event, nodeIds) => {
        setExpandedLeft(nodeIds);
    };

    const handleSelectLeft = (event, nodeIds) => {
        setSelectedLeft(nodeIds);
    };
    // END - ControlledTreeViewLEFT

    // START - ControlledTreeViewRIGHT
    const [expandedRight, setExpandedRight] = useState([]);
    const [selectedRight, setSelectedRight] = useState([]);

    const handleToggleRight = (event, nodeIds) => {
        setExpandedRight(nodeIds);
    };

    const handleSelectRight = (event, nodeIds) => {
        setSelectedRight(nodeIds);
    };
    // END - ControlledTreeViewRIGHT

    const handleUserClick = (event, userId) => {
        event.preventDefault();
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fetchASpecificUser = async () => {
            const result = await axiosInstance.get(`/users/${userId}`);
            setUserLists(result.data.lists);
        }
        fetchASpecificUser();
    }

    return (
        <div className="auth-wrapper-table">
            <div className="auth-inner-table">
                {/* ControlledTreeView LEFT */}
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expandedLeft}
                    selected={selectedLeft}
                    onNodeToggle={handleToggleLeft}
                    onNodeSelect={handleSelectLeft}
                >
                    {
                        users.map(user => {
                            return (
                                <TreeItem nodeId={user.id} label={user.email} onLabelClick={(event) => handleUserClick(event, user.id)}>
                                    {userLists.map(list => {
                                        return (
                                            <MyTreeItem nodeId={list.id} label={list.name} />
                                        )
                                    })}
                                </TreeItem>
                            )
                        })
                    }
                </TreeView>
                <br />
                <br />
                {/* ControlledTreeView RIGHT */}
                {/* <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expandedRight}
                    selected={selectedRight}
                    onNodeToggle={handleToggleRight}
                    onNodeSelect={handleSelectRight}
                >
                    {
                        users.map(user => {
                            return (
                                <TreeItem nodeId={user.id} label={user.email}>
                                    <TreeItem nodeId="5" label="Calendar" />
                                    <TreeItem nodeId="6" label="Chrome" />
                                    <TreeItem nodeId="7" label="Webstorm" />
                                </TreeItem>
                            )
                        })
                    }
                </TreeView> */}
            </div>
        </div>
    )
}

export default CompareListsOfDifferentUsers;