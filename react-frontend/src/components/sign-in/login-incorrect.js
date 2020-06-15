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
            null
        // Return null to avoid component rendering
        // https://reactjs.org/docs/conditional-rendering.html#preventing-component-from-rendering
    )
}

export default AlertPasswordIncorrectComponent;