import React, { useState } from 'react'
import TreeItem from '@material-ui/lab/TreeItem';

const MyTreeItem = (props) => {
    const [userLists, setUserLists] = useState([]);

    return (
        <TreeItem nodeId={props.user.id} label={props.user.email} />
    )
}

export default MyTreeItem;