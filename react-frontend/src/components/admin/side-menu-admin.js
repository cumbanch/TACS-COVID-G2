import React from 'react'
import { elastic as Menu } from 'react-burger-menu';
import MenuItemComponent from '../dashboards/menu-item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGlobeAmericas, faList } from '@fortawesome/free-solid-svg-icons'

const SideMenuAdminComponent = () => {

    const userIcon = <FontAwesomeIcon icon={faUser} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    const listIcon = <FontAwesomeIcon icon={faList} />

    return (
        <Menu outerContainerId={"root"} pageWrapId={"navCovid"}  >
            <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/admin/users" aTitle="USERS INFO" />
            <MenuItemComponent anId="Compare" anIcon={userIcon} urlRef="/admin/compare" aTitle="LISTS COMPARE" />
            <MenuItemComponent anId="Countries" anIcon={countryIcon} urlRef="/admin/countries" aTitle="COUNTRIES INFO" />
            <MenuItemComponent anId="Lists" anIcon={listIcon} urlRef="/admin/lists" aTitle="REGISTERED LISTS" />
        </Menu>
    )
}

export default SideMenuAdminComponent;