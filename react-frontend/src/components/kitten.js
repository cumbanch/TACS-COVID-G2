import React, { Component, useState } from "react";

const Kitten = (props) => {
    const [estado, cambiarEstado] = useState({ img: props.img, nombre: props.nombre });

    const getGatito = () => {

        return fetch("https://api.thecatapi.com/v1/images/search",
            {
                method: 'GET',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://api.thecatapi.com'
                }
            })
            .then(response => response.json())
            .then(responseJson => cambiarEstado({ img: responseJson[0].url, nombre: "Michi2" }));
    };


    return (
        <div className="container">
            <img id={estado.id} onClick={getGatito}
                src={estado.img} alt="new"

            />
            {estado.nombre}
        </div>
    );
}


export default Kitten;



