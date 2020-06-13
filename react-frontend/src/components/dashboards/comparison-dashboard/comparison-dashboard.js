import React, { useState, useEffect } from 'react'
import ComparisonItemComponent from './comparison-item'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
}));

function getStyles(name, params, theme) {

    return {
        fontWeight:
            params.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 80,
        },
    },
};
const ComparisonComponent = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const handleChangeFirst = (event) => {
        console.log("handleChangeFirst");
        console.log(params);
        console.log(event.target.value);
        if (event.target.value == []) setOtherParams(Object.assign({}, params, { selectedItemsFirst: event.target.value, isCountryListDisabled: true, selectedItemsSecond: [] }));
        const countries = getDependantDataArrayByProperty(params.listSelect);
        setOtherParams(Object.assign({}, params, { selectedItemsFirst: event.target.value, isCountryListDisabled: false, selectedItemsSecond: [], selectedObjectsSecond: [], countriesList: countries }));

    };
    const handleChangeSecond = (event) => {
        console.log("handleChangeSecond")
        console.log(event.target.value);
        console.log("params");
        console.log(params);
        const selectObjects = getCountriesFromList(getListFromId(params.listSelect, !params.selectedItemsFirst[0] ? undefined : params.selectedItemsFirst[0].id), event.target.value);
        console.log("select objects")
        console.log(selectObjects);
        setOtherParams(Object.assign({}, params, { selectedItemsSecond: event.target.value, selectedObjectsSecond: selectObjects }));
    }
    const getDependantDataArrayByProperty = (someArray) => {
        return someArray.flatMap((someData) => (someData["countries"]));
    }
    const getCountriesFromList = (someList, countriesIds) => {
        console.log("someList"); console.log(someList); console.log(countriesIds);
        if (!someList || !countriesIds) return [{ id: 0, name: "error", flag: "https://image.shutterstock.com/image-vector/original-simple-argentina-flag-isolated-260nw-516324706.jpg", timeseries: [] }];
        return params.countriesList.filter((someCountry) => (countriesIds.includes(someCountry.id)));
    }
    const [params, setOtherParams] = useState({
        isCountryListDisabled: true, listSelect: [], countriesList: [], selectedItemsFirst: [],
        selectedItemsSecond: [], selectedObjectsSecond: []
    })
    const getListFromId = (someListArray, someListId) => {
        console.log("getListFromId");
        console.log(someListArray);
        console.log(someListId);
        if (!someListArray || !someListId) return [{ countries: [] }];
        return someListArray.find((someList) => someList.name == someListId)
    };
    const getUserLists = async () => {
        const tokens = JSON.parse(localStorage.getItem('userInfo'));
        const response = await fetch("http://localhost:8080/lists",
            {
                method: 'GET',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://localhost:8080',
                    'Authorization': tokens.access_token
                }
            });
        const mock = [{
            id: 10, name: "Favoritos", countries: [{
                "id": 10,
                "name": "Argentina",
                "flag": "https://image.shutterstock.com/image-vector/original-simple-argentina-flag-isolated-260nw-516324706.jpg",
                "iso_2": "AR",
                "iso_3": "ARG",
                "latitude": "-34",
                "longitude": "-64",
                "created_at": "2020-05-25T23:49:27.000Z",
                "updated_at": "2020-05-25T23:49:27.000Z",
                "deleted_at": null,
                "timeseries": [{
                    "confirmed": 0,
                    "deaths": 0,
                    "recovered": 0,
                    "date": "2020/02/26"
                },
                {
                    "confirmed": 0,
                    "deaths": 0,
                    "recovered": 0,
                    "date": "2020/02/26"
                }]
            },
            {
                "id": 204,
                "name": "Singapore",
                "flag": "https://cdn.britannica.com/36/4036-004-745547DB/Flag-Singapore.jpg",
                "iso_2": "SG",
                "iso_3": "SGP",
                "latitude": "13667",
                "longitude": "103.8",
                "created_at": "2020-05-25T23:49:27.000Z",
                "updated_at": "2020-05-25T23:49:27.000Z",
                "deleted_at": null,
                "timeseries": [{
                    "confirmed": 0,
                    "deaths": 0,
                    "recovered": 0,
                    "date": "2020/02/26"
                },
                {
                    "confirmed": 0,
                    "deaths": 0,
                    "recovered": 0,
                    "date": "2020/02/26"
                }]
            }]
        }];
        const result = await response.json();
        const list = result.data.length > 0 ? result.data : mock;
        return list.map(someList =>
            ({ id: someList.id, name: someList.name, countries: someList.countries }))

    };
    const populateLists = async (someListsList) => {
        const tokens = JSON.parse(localStorage.getItem('userInfo'));
        someListsList.forEach(async (aList) => (
            aList.countries = await fetch(`http://localhost:8080/lists/${aList.id}/history`,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'https://localhost:8080',
                        'Authorization': tokens.access_token
                    }
                })
        ));

    }
    useEffect(() => {
        async function FetchData() {
            const result = await getUserLists();
            //populateLists(result);
            setOtherParams(Object.assign({}, params, { listSelect: result }));
        }
        FetchData();
    }, []);
    const rowsTest = [
        { date: "2020-04-20", deaths: 42 },
        { date: "2020-04-21", deaths: 121 },
        { date: "2020-04-22", deaths: 32 },
        { date: "2020-04-23", deaths: 10 },
        { date: "2020-04-24", deaths: 9 },
        { date: "2020-04-25", deaths: 69 },
        { date: "2020-04-26", deaths: 14 },
        { date: "2020-04-27", deaths: 31 },
        { date: "2020-04-28", deaths: 75 },
    ];

    const rowsTest2 = rowsTest.map(row => ({ date: row.date, deaths: row.deaths + 15 }));
    let dataForLines = rowsTest.map(row => ({ name: row.date, Mexico: row.deaths, Argentina: 0 }));
    dataForLines = dataForLines.map(row => ({ name: row.name, Mexico: row.Mexico, Argentina: rowsTest2.find(a_row => (a_row.date === row.name)).deaths }));

    //[{ id: 0, name: "saraza", countries: [] }]
    return (
        <div className="container layout-dashboard">


            <div style={{ display: "flex", flexFlow: "row" }}  >
                <FormControl className={classes.formControl} style={{ maxWidth: '200px', minWidth: 75, marginInlineEnd: 50 }}>
                    <InputLabel id="demo-simple-select-label">{"Listas"}</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"

                        value={params.selectedItemsFirst}
                        onChange={handleChangeFirst}
                        input={<Input />}

                        MenuProps={MenuProps}
                    >
                        {params.listSelect.map((someList) => (
                            <MenuItem key={someList.id} value={someList.name} style={getStyles(someList.name, params.selectedItemsFirst, theme)}>
                                {someList.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {!params.isCountryListDisabled ? <FormControl className={classes.formControl} style={{ maxWidth: '200px', minWidth: 75, marginInlineEnd: 50 }}>
                    <InputLabel id="demo-simple-select-label2">{"Paises"}</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label2"
                        id="demo-mutiple-chip2"
                        multiple
                        value={params.selectedItemsSecond}
                        onChange={handleChangeSecond}
                        input={<Input />}

                        MenuProps={MenuProps}
                    >
                        {params.countriesList.map((someCountry) => (
                            <MenuItem key={someCountry.name} value={someCountry.id} style={getStyles(someCountry.name, params.selectedItemsSecond, theme)}>
                                {someCountry.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> : null}
            </div>
            <div style={{ display: "flex", flexFlow: "row" }}>
                {/* {getCountriesFromList(getListFromId(params.listSelect, params.selectedItemsFirst), params.selectedItemsSecond).map((someCountry) => (<p > a {someCountry.id}</p>))} */}
                {params.selectedObjectsSecond.map((someCountry) => (<ComparisonItemComponent id={someCountry.id} flag={someCountry.flag} rows={someCountry.timeseries} />))}
                {/* <ComparisonItemComponent flag="https://image.shutterstock.com/image-vector/original-simple-argentina-flag-isolated-260nw-516324706.jpg" rows={rowsTest2} /> */}

                <LineChart
                    width={400}
                    height={300}
                    data={dataForLines}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Mexico" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Argentina" stroke="#82ca9d" />

                </LineChart>
            </div>
        </div>
    );

}
export default ComparisonComponent;