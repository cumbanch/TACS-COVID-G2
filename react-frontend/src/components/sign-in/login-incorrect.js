import React, { useState } from "react";

const AlertPasswordIncorrectComponent = (props) => {
    return (
        props.passwordIncorrect ?
            <div>
                <br />
                <div className="alert alert-danger" role="alert">
                    Incorrect password!
                </div>
            </div>
            :
            <div></div>

    )
}

export default AlertPasswordIncorrectComponent;