import React, { useState } from 'react'
import { elastic as Menu } from 'react-burger-menu';
import MenuItemComponent from '../dashboards/menu-item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGlobeAmericas, faList, faCheck } from '@fortawesome/free-solid-svg-icons'

const SideMenuAdminComponent = () => {

    const userIcon = <FontAwesomeIcon icon={faUser} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    const listIcon = <FontAwesomeIcon icon={faList} />
    const checkIcon = <FontAwesomeIcon icon={faCheck} />

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu isOpen={isMenuOpen} outerContainerId={"root"} pageWrapId={"navCovid"}  >
            <MenuItemComponent handleIsMenuOpen={closeMenu} anId="Users" anIcon={userIcon} urlRef="/admin/users" aTitle="USERS INFO" />
            <MenuItemComponent handleIsMenuOpen={closeMenu} anId="Compare" anIcon={checkIcon} urlRef="/admin/compare" aTitle="LISTS COMPARISON" />
            <MenuItemComponent handleIsMenuOpen={closeMenu} anId="Countries" anIcon={countryIcon} urlRef="/admin/countries" aTitle="COUNTRIES INFO" />
            <MenuItemComponent handleIsMenuOpen={closeMenu} anId="Lists" anIcon={listIcon} urlRef="/admin/lists" aTitle="REGISTERED LISTS" />
        </Menu>
    )
}

export default SideMenuAdminComponent;