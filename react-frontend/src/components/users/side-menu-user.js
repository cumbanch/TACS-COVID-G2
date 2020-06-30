import React from 'react'
import { slide as Menu } from 'react-burger-menu';

import MenuItemComponent from '../dashboards/menu-item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faGlobeAmericas, faList } from '@fortawesome/free-solid-svg-icons'

var styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '15px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmBurgerBarsHover: {
        background: '#007bff'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
        width: '10%'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}
const SideMenuUserComponent = () => {

    const userIcon = <FontAwesomeIcon icon={faUser} />
    const chartIcon = <FontAwesomeIcon icon={faChartBar} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    const listIcon = <FontAwesomeIcon icon={faList} />

    return (
        <Menu outerContainerId={"root"} pageWrapId={"navCovid"} style={styles} >
            {/* <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/users" aTitle="USUARIOS" /> */}
            <MenuItemComponent anId="Graphics" anIcon={chartIcon} urlRef="/graphics" aTitle="GRAPHICS" />
            <MenuItemComponent anId="Listas" anIcon={listIcon} urlRef="/lists" aTitle="LISTS" />
        </Menu>
    )
}

export default SideMenuUserComponent;
