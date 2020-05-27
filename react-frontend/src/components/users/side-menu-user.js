import React from 'react'
import { elastic as Menu } from 'react-burger-menu';
import MenuItemComponent from '../dashboards/menu-item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faGlobeAmericas, faList } from '@fortawesome/free-solid-svg-icons'

const SideMenuUserComponent = () => {

    const userIcon = <FontAwesomeIcon icon={faUser} />
    const chartIcon = <FontAwesomeIcon icon={faChartBar} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    const listIcon = <FontAwesomeIcon icon={faList} />

    return (
        <Menu outerContainerId={"root"} pageWrapId={"navCovid"}  >
            {/* <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/users" aTitle="USUARIOS" /> */}
            <MenuItemComponent anId="Listas" anIcon={listIcon} urlRef="/lists" aTitle="LISTAS" />
            <MenuItemComponent anId="Paises" anIcon={countryIcon} urlRef="/countries" aTitle="PAISES" />
            <MenuItemComponent anId="Graphics" anIcon={chartIcon} urlRef="/graphics" aTitle="GRAFICOS" />
        </Menu>
    )
}

export default SideMenuUserComponent;
