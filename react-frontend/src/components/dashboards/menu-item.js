
import React, { useState } from "react";
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
        <a onMouseEnter={changeTextColorIn} onMouseLeave={changeTextColorOut} className="bm-item" id={params.anId} href={params.urlRef} tabIndex="0" style={{ color: params.acolor, display: "block" }}>{params.anIcon} <span >{params.aTitle} </span></a>
    );
};

export default MenuItemComponent;