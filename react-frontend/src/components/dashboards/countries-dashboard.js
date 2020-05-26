import React, { useState } from 'react'
import axios from 'axios';

const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem('userInfo'));
    return tokens.access_token;
}


const CountriesComponent = (props) => {

    // const getCountriesList = async () => {
    //     const response = await axios.get(
    //         "http://localhost:8080/countries/",
    //         {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': 'https://localhost:8080',
    //                 'Authorization': getAccessToken(),
    //             }
    //         });
    //     return response.data;
    // };

    // const listOfCountries = getCountriesList();
    // console.log(listOfCountries);

    // return (
    //     <div>
    //         <h1>Resultado</h1>
    //         <h1>Resultado</h1>
    //         <h1>Resultado</h1>
    //         <h1>Resultado</h1>
    //         <h1>Resultado</h1>
    //         <h1>Resultado</h1>
    //         <h1>{listOfCountries.length}</h1>
    //         {/* {listOfCountries.map(c => {
    //             return (<h6>{c.name}</h6>)
    //         }
    //         )} */}
    //     </div>
    // );
    return (
        <div>

        </div>
    )
}

export default CountriesComponent;