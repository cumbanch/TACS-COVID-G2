import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
const lodash = require('lodash');
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
        // console.log("handleChangeFirst");
        // console.log(params);
        // console.log(event.target.value);
        if (event.target.value == []) setOtherParams(Object.assign({}, params, { selectedItemsFirst: event.target.value, isCountryListDisabled: true, selectedItemsSecond: [] }));
        const countries = getDependantDataArrayByProperty(params.listSelect);
        countries.map((x) => { x["color"] = "#" + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6); return x; });
        setOtherParams(Object.assign({}, params, { selectedItemsFirst: event.target.value, isCountryListDisabled: false, selectedItemsSecond: [], selectedObjectsSecond: [], countriesList: countries }));

    };
    const handleChangeSecond = (event) => {
        // console.log("handleChangeSecond")
        // console.log(event.target.value);
        // console.log("params");
        // console.log(params);
        const selectObjects = getCountriesFromList(getListFromId(params.listSelect, !params.selectedItemsFirst[0] ? undefined : params.selectedItemsFirst[0].id), event.target.value);
        // console.log("select objects")
        // console.log(selectObjects);
        selectObjects.map((someObject) => { someObject["offset"] = !someObject["offset"] ? 0 : someObject["offset"]; return someObject; });
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
        selectedItemsSecond: [], selectedObjectsSecond: [], selection: "deaths"
    })
    const getListFromId = (someListArray, someListId) => {
        // console.log("getListFromId");
        // console.log(someListArray);
        // console.log(someListId);
        if (!someListArray || !someListId) return [{ countries: [] }];
        return someListArray.find((someList) => someList.name == someListId)
    };
    const mapTimeSeriesForGraphic = (someCountry) => {
        var testresult = someCountry.timeseries.map((someTimeSerie) =>
            ({
                countryName: someCountry.name,
                deaths: someTimeSerie.deaths,
                recovered: someTimeSerie.recovered,
                confirmed: someTimeSerie.confirmed,
                date: someTimeSerie.date
            }));

        return testresult;
    }
    const getTimeSeriesForGraphic = (someCountries, someSelection) => {
        var allTimeSeries = someCountries.flatMap((someCountry) => (mapTimeSeriesForGraphic(someCountry)));

        // console.log("allTimeSeries");
        // console.log(allTimeSeries);
        const groupedTimeSeries = lodash.groupBy(allTimeSeries, "date");
        const keys = Object.keys(groupedTimeSeries);
        const timeSeriesForGraphic = keys.map((someDate) => {
            const seriesFromThatDate = groupedTimeSeries[someDate];
            var jsonForGraphic = {};

            jsonForGraphic["name"] = someDate;
            seriesFromThatDate.forEach((someSerie) => {

                jsonForGraphic[someSerie["countryName"]] = someSerie[params.selection];
            });


            return jsonForGraphic;
        });

        // console.log("timeSeriesForGraphic");
        // console.log(timeSeriesForGraphic);

        return lodash.orderBy(timeSeriesForGraphic, "name");

    };
    const changeSelection = (someSelection) => { setOtherParams(Object.assign({}, params, { selection: someSelection })) }
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
                "timeseries": [
                    {
                        "confirmed": 50,
                        "deaths": 50,
                        "recovered": 2,
                        "date": "2020/02/23"
                    }, {
                        "confirmed": 15,
                        "deaths": 185,
                        "recovered": 3,
                        "date": "2020/02/26"
                    },
                    {
                        "confirmed": 70,
                        "deaths": 290,
                        "recovered": 4,
                        "date": "2020/02/27"
                    }]
            }, {
                "id": 101,
                "name": "Paraguay",
                "flag": "https://image.shutterstock.com/image-vector/original-simple-argentina-flag-isolated-260nw-516324706.jpg",
                "iso_2": "AR",
                "iso_3": "ARG",
                "latitude": "-34",
                "longitude": "-64",
                "created_at": "2020-05-25T23:49:27.000Z",
                "updated_at": "2020-05-25T23:49:27.000Z",
                "deleted_at": null,
                "timeseries": [
                    {
                        "confirmed": 100,
                        "deaths": 70,
                        "recovered": 2,
                        "date": "2020/02/20"
                    }, {
                        "confirmed": 500,
                        "deaths": 200,
                        "recovered": 3,
                        "date": "2020/02/21"
                    },
                    {
                        "confirmed": 70,
                        "deaths": 500,
                        "recovered": 4,
                        "date": "2020/02/23"
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
                "timeseries": [
                    {
                        "confirmed": 10,
                        "deaths": 1,
                        "recovered": 2,
                        "date": "2020/02/24"
                    }, {
                        "confirmed": 80,
                        "deaths": 12,
                        "recovered": 1,
                        "date": "2020/02/26"
                    },
                    {
                        "confirmed": 710,
                        "deaths": 60,
                        "recovered": 20,
                        "date": "2020/02/27"
                    }]
            }]
        }];
        const result = await response.json();
        const list = result.data.length > 0 ? result.data : mock;
        return list.map(someList =>

            ({ id: someList.id, name: someList.name, countries: [] }))

    };
    const populateLists = async (someListsList) => {
        const tokens = JSON.parse(localStorage.getItem('userInfo'));
        // console.log("someListList");
        // console.log(someListsList);
        await someListsList.forEach(async (aList) => {
            var result = await fetch(`http://localhost:8080/lists/${aList.id}/history`,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'https://localhost:8080',
                        'Authorization': tokens.access_token
                    }
                }).then(response => response.json());
            console.log(result);
            aList.countries = result;
        }
        );
        // console.log("populate")
        // console.log(someListsList);

    }
    const queryOffset = async (someListId, offsetsquery) => {
        console.log(someListId);
        console.log(offsetsquery);
        const tokens = JSON.parse(localStorage.getItem('userInfo'));
        const countriesWithOffset = await fetch(`http://localhost:8080/lists/${someListId}/history?offsets=${offsetsquery}`,
            {
                method: 'GET',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://localhost:8080',
                    'Authorization': tokens.access_token
                }
            }).then(response => response.json());
        console.log(countriesWithOffset);
        console.log("countriesWithOffset");
        return countriesWithOffset;
        // setOtherParams(Object.assign({}, params, { selectedObjectsSecond: {} }))
    }
    const handleOffsetChange = async (event, countryId) => {
        const countriesInSelect = params.selectedObjectsSecond;
        const value = !event.target.value ? 0 : event.target.value;
        const countryMapped = countriesInSelect.map((someCountry) => {
            if (someCountry.id == countryId) someCountry.offset = value;
            return someCountry;
        });
        const countriesWithOffset1 = await queryOffset(params.listSelect.find((x) => (params.selectedItemsFirst.includes(x.name))).id, "[" + countryMapped.map((c) => (`{"country_id":${c.id},"offset": ${c.offset}}`)).join(',') + "]");
        countryMapped.map((someCountry) => { someCountry.timeseries = countriesWithOffset1.find((x) => (x.id == someCountry.id)).timeseries; return someCountry })


        setOtherParams(Object.assign({}, params, { selectedObjectsSecond: countryMapped }));


    };
    useEffect(() => {
        async function FetchData() {
            const result = await getUserLists();

            populateLists(result);
            setOtherParams(Object.assign({}, params, { listSelect: result }));
        }
        if (params.listSelect.length == 0) FetchData();
    }, []);


    return (
        <div className="container layout-dashboard">


            <div style={{ display: "flex", flexFlow: "row", marginTop: 30 }}  >

                <FormControl className={classes.formControl} style={{ maxWidth: '250px', minWidth: 120, marginInlineEnd: 50 }}>

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

                {!params.isCountryListDisabled ? <FormControl className={classes.formControl} style={{ maxWidth: '200px', minWidth: 120, marginInlineEnd: 50 }}>

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
            <div style={{ display: "flex", flexFlow: "row", marginTop: 30 }}>
                {params.selectedObjectsSecond.length == 0 ? null :
                    <div style={{ flexGrow: 1 }}>
                        <Grid container spacing={6} alignItems="stretch">
                            <Grid item xs>

                                <div className={classes.demo}>
                                    <List >
                                        {/* {params.selectedItemsSecond.map((x) => (<input type={"number"} name={x} />))} */}
                                        {params.selectedItemsSecond.map((x) => (<ListItem>
                                            <ListItemText
                                                primary={params.selectedObjectsSecond.find((y) => (y.id == x)).name}
                                            />
                                            <input onKeyUp={(e) => (handleOffsetChange(e, x))} type={"number"} name={x.id} defaultValue={params.selectedObjectsSecond.find((y) => (y.id == x)).offset} />
                                        </ListItem>))
                                        }
                                    </List>

                                </div>
                            </Grid></Grid>
                    </div>
                }
                <div>
                    {params.selectedObjectsSecond.length == 0 ? null :
                        <div style={{ display: "flex", flexFlow: "column" }} >
                            <div style={{ display: "flex", flexFlow: "row", marginBottom: 30 }}>
                                <Button onClick={() => changeSelection("deaths")} id="deathsButton" variant="outlined" color="primary" style={{ marginLeft: 60 }}>Muertes</Button>
                                <Button onClick={() => changeSelection("confirmed")} id="confirmedButton" variant="outlined" color="primary" style={{ marginLeft: 30 }}>Confirmados </Button>
                                <Button onClick={() => changeSelection("recovered")} id="recoveredButton" variant="outlined" color="primary" style={{ marginLeft: 30 }}>Recuperados </Button>
                            </div>
                            <div style={{ display: "flex", flexFlow: "row" }}>
                                <LineChart
                                    width={600}
                                    height={300}
                                    data={params.selectedObjectsSecond === [] ? [] : getTimeSeriesForGraphic(params.selectedObjectsSecond)}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {params.countriesList.map((someCountry) => (<Line type="monotone" connectNulls={true} dataKey={someCountry.name} stroke={someCountry.color} activeDot={{ r: 8 }} />))}


                                </LineChart>
                            </div>
                        </div>}

                </div>


            </div>


        </div >
    );

}
export default ComparisonComponent;