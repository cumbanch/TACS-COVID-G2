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
            <MenuItemComponent anId="Usuarios" anIcon={userIcon} urlRef="/admin/usuarios" aTitle="USUARIOS" />
            <MenuItemComponent anId="Paises" anIcon={countryIcon} urlRef="/admin/paises" aTitle="PAISES" />
            <MenuItemComponent anId="Listas" anIcon={listIcon} urlRef="/admin/listas" aTitle="LISTAS" />
        </Menu>
    )
}

export default SideMenuAdminComponent;