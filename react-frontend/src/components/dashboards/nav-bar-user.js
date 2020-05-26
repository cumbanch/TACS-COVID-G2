import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavBarUserComponent = () => {
    const userIcon = <FontAwesomeIcon icon={faUser} />

    return (
        <div>
            <h6>
                {userIcon}
                <p>{localStorage.getItem("userEmail")}</p>
            </h6>
        </div>
    )
}

export default NavBarUserComponent;