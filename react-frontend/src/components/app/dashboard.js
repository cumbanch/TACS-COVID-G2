import React, { useState } from "react";

import MenuItemComponent from './menuItem'
import "../../assets/sass/burger-menu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { elastic as Menu } from 'react-burger-menu';
const DashboardComponent = (props) => {
    const [params, setParams] = useState('');
    const chartIcon = <FontAwesomeIcon icon={faChartBar} />
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    return (
        <div id="test">
            <div id="page-wrap">
                <Menu pageWrapId={"inner-container"} outerContainerId={"root"}  >
                    <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/users" aTitle="USUARIOS" />
                    <MenuItemComponent anId="Graphics" anIcon={chartIcon} urlRef="/graphics" aTitle="GRAFICOS" />
                    <MenuItemComponent anId="Paises" anIcon={countryIcon} urlRef="/countries" aTitle="PAISES" />
                </Menu>

            </div>
            <div className="container layout-dashboard">
                <img src="https://i.ytimg.com/vi/YFmmNVt78wg/hqdefault.jpg" style={{ width: "1000px", height: "700px" }} />
            </div>
        </div>

    );
};
export default DashboardComponent;