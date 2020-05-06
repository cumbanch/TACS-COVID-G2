import React, { useState, PureComponent } from 'react'
import ComparisonItemComponent from './comparison-item'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import MultiSelectWithItemsComponent from '../../app/multi-select-with-items'
const ComparisonComponent = (props) => {



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
    const countriesList = [{ id: 'Lista1', list: ['Brazil', 'Colombia', 'Suecia'] }, { id: 'Lista2', list: ['Botswana', 'Peru', 'Nigeria'] }]
    return (
        <div className="container layout-dashboard">
            <div style={{ display: "flex", flexFlow: "row" }}>
                <MultiSelectWithItemsComponent id='ListSelect' countries={countriesList.map((unaLista) => (unaLista.id))} selectTitle={'Lista'} />
                <MultiSelectWithItemsComponent id='CountriesSelect' countries={countriesList.map((unaLista) => (unaLista.list))} selectTitle={'Paises'} />
            </div>


            <div style={{ display: "flex", flexFlow: "row" }}>

                <ComparisonItemComponent flag="https://myhero.com/images/guest/g237468/hero71945/g237468_u84849_mexico_flag.jpg" rows={rowsTest} />
                <ComparisonItemComponent flag="https://image.shutterstock.com/image-vector/original-simple-argentina-flag-isolated-260nw-516324706.jpg" rows={rowsTest2} />
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