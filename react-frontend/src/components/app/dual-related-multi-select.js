import React, { useState, useEffect } from 'react'
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
    console.log(params)
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

const DualRelatedSelectComponent = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const realDataArray = props.dataArray;
    const [params, setParams] = useState({
        firstTitle: props.firstTitle,
        secondTitle: props.secondTitle,
        dataArray: [],
        dependantArrayProperty: props.dependantArrayProperty,
        isSecondSelectEnabled: false,
        dataArraySecond: [],
        selectedItemsFirst: [],
        selectedItemsSecond: []
    });
    console.log("construi el componente")
    useEffect(() => {
        async function FetchData() {
            const result = await realDataArray();
            console.log("voy a logear el result")
            console.log(result);

            setParams(Object.assign({}, params, { dataArray: result }));
        }
        FetchData();
    }, []);
    console.log("despues de use efect")
    console.log(params.dataArray)
    const handleChangeFirst = (event) => {
        if (event.target.value == []) setParams(Object.assign({}, params, { selectedItemsFirst: event.target.value, isSecondSelectEnabled: false, selectedItemsSecond: [] }))
        setParams(Object.assign({}, params, { selectedItemsFirst: event.target.value, isSecondSelectEnabled: true, selectedItemsSecond: [], dataArraySecond: getDependantDataArrayByProperty(params.dataArray, params.dependantArrayProperty) }));
    };
    const handleChangeSecond = (event) => {
        setParams(Object.assign({}, params, { selectedItemsSecond: event.target.value }));
    }
    const getDependantDataArrayByProperty = (someArray, someProperty) => someArray.flatMap((someData) => (someData[someProperty]))
    {
        return (
            <div style={{ display: "flex", flexFlow: "row" }}  >
                <FormControl className={classes.formControl} style={{ maxWidth: '200px', minWidth: 75, marginInlineEnd: 50 }}>
                    <InputLabel id="demo-simple-select-label">{params.firstTitle}</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={params.selectedItemsFirst}
                        onChange={handleChangeFirst}
                        input={<Input />}

                        MenuProps={MenuProps}
                    >
                        {params.dataArray.map((someList) => (
                            <MenuItem key={someList.id} value={someList.name} style={getStyles(someList.name, params.selectedItemsFirst, theme)}>
                                {someList.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {params.isSecondSelectEnabled ? <FormControl className={classes.formControl} style={{ maxWidth: '200px', minWidth: 75, marginInlineEnd: 50 }}>
                    <InputLabel id="demo-simple-select-label2">{params.secondTitle}</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label2"
                        id="demo-mutiple-chip2"
                        multiple
                        value={params.selectedItemsSecond}
                        onChange={handleChangeSecond}
                        input={<Input />}

                        MenuProps={MenuProps}
                    >
                        {params.dataArraySecond.map((someCountry) => (
                            <MenuItem key={someCountry.name} value={someCountry.id} style={getStyles(someCountry.name, params.selectedItemsSecond, theme)}>
                                {someCountry.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> : null}

            </div>
        )
    }
}
export default DualRelatedSelectComponent;