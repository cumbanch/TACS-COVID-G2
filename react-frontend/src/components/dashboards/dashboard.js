import React, { useState } from "react";


const DashboardComponent = (props) => {
    const [params, setParams] = useState({});

    return (
        <div id="dash">

            <div className="container layout-dashboard">
                <img src="https://i.ytimg.com/vi/YFmmNVt78wg/hqdefault.jpg" style={{ width: "1000px", height: "700px" }} />
            </div>
        </div>

    );
};
export default DashboardComponent;
