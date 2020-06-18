import React, { useState } from "react";
import { NavLink } from 'react-router-dom'

const MenuItemComponent = (props) => {
    const [params, setparams] = useState({
        anIcon: props.anIcon,
        urlRef: props.urlRef,
        anId: props.anId,
        aTitle: props.aTitle,
        acolor: "#b8b7ad"
    })
    const changeTextColorIn = () => setparams(Object.assign({}, params, { acolor: "#007bff" }));
    const changeTextColorOut = () => setparams(Object.assign({}, params, { acolor: "#b8b7ad" }));

    return (
        <NavLink onClick={props.handleIsMenuOpen} onMouseEnter={changeTextColorIn} onMouseLeave={changeTextColorOut} className="bm-item" id={params.anId} to={params.urlRef} tabIndex="0" style={{ color: params.acolor, display: "block" }}>{params.anIcon} <span>{params.aTitle}</span> </NavLink>
    );
};

export default MenuItemComponent;