import React from 'react'
import './list-info.css'
import DropMenuComponent from './drop-menu';

const ListInfoComponent = () => {
    return (
        <div className="auth-wrapper">
            <div className="box-content">
                <h2>Cantidad de listas registradas</h2>
                <p>Seleccione una opción en el menú desplegable para ver la cantidad de listas registradas</p>
                <DropMenuComponent />
            </div>
        </div>
    )
}

export default ListInfoComponent;