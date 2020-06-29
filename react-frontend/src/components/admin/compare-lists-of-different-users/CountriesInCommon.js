import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserAccessToken } from '../../session-managment/utils';
import ListOfConuntriesInCommon from './ListOfCountriesInCommon';

const CountriesInCommon = ({ firstList, secondList }) => {
    const [countriesInCommon, setCountries] = useState([]);

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fecthCountriesInCommon = async () => {
            const response = await axiosInstance.post('/lists/compare',
                JSON.stringify({
                    'lists': [firstList.id, secondList.id]
                }));
            const listOfCountriesInCommon = response.data;
            setCountries(listOfCountriesInCommon);
        }

        fecthCountriesInCommon();
    }, []);
    return (
        <div>
            {countriesInCommon.length > 0 ?
                <span>
                    <h4>List of countries in common</h4>
                    <ListOfConuntriesInCommon countriesInCommon={countriesInCommon} />
                </span>
                :
                "There are not countries in common between these two lists"
            }
        </div>
    )
}

export default CountriesInCommon;
