import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { getUserEmailFromLocalStorage } from './../session-managment/utils'

const NavBarUserComponent = () => {
    const userIcon = <FontAwesomeIcon icon={faUser} />

    return (
        <div>
            <h6>
                {userIcon}
                <p>{getUserEmailFromLocalStorage()}</p>
            </h6>
        </div>
    )
}

export default NavBarUserComponent;