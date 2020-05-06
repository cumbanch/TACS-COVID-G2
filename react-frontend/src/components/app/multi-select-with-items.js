import React, { useState } from 'react'
import Chip from '@material-ui/core/Chip'
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
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

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

// <div className={classes.chips}>
//     {selected.map((value) => (
//         <Chip key={value} label={value} className={classes.chip} />
//     ))}
// </div>

const MultiSelectWithItemsComponent = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [params, setParams] = React.useState({ selectedCountries: [], items: props.countries, selectTitle: props.selectTitle, isDisabled: props.isDisabled && true });
    console.log(params)
    const handleChange = (event) => {

        setParams({ selectedCountries: event.target.value, items: params.countries });
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setParams(value);
    };
    return (
        <FormControl className={classes.formControl} style={params.isDisabled ? { pointerEvents: "none", opacity: "0.4" } : { maxWidth: '200px', minWidth: 75, marginInlineEnd: 50 }}>
            <InputLabel id="demo-simple-select-label">{params.selectTitle}</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={params.selectedCountries}
                onChange={handleChange}
                input={<Input />}

                MenuProps={MenuProps}
            >
                {params.items.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, params.selectedCountries, theme)}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default MultiSelectWithItemsComponent;