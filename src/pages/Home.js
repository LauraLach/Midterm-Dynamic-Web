import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { CURRENCY_API_KEY, HOLIDAY_API_KEY } from "../API_KEYS";
import Header from '../components/Header';
// import WeatherCard from '../components/WeatherCard';

function Home() {
    const [currencyData, setCurrencyData] = useState({});
    const [holidayData, setHolidayData] = useState({});
    const [searchParams] = useSearchParams();
    const [country, setCountry] = useState('CA');
    const [currency, setCurrency] = useState('CAD'); 
    let dateToday = new Date().toISOString().slice(0,10);
    let currentYear = new Date().getFullYear();

    // console.log(currentYear);
// console.log("searchParams", searchParams.get("country"));
// console.log(`https://calendarific.com/api/v2/holidays?&api_key=${HOLIDAY_API_KEY}&country=CA&year=2022`)

useEffect(() => {
    const countryToQuery = searchParams.get("country") || country;
    setCountry(countryToQuery);
    const currencyToQuery = searchParams.get("currency") || currency;
    setCurrency(currencyToQuery);
    axios
        .get(`https://calendarific.com/api/v2/holidays?&api_key=${HOLIDAY_API_KEY}&country=${countryToQuery}&year=${currentYear}`)
        .then(function (response) {
            setHolidayData(response.data.response.holidays);
            // console.log("response", response);
        })
        .catch(function (error) {
            console.warn(error);
            setHolidayData({});
        });
    axios
        .get(`https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/${currency}`)
        .then(function (response) {
            const responseUndefinedTest = response.data && response.data.conversion_rates;
            const usdRate = responseUndefinedTest && responseUndefinedTest.USD;
            setCurrencyData(usdRate);
        })
        .catch(function (error) {
            console.warn(error);
            setCurrencyData({});
        });
    }, []);
    console.log("currency response", currencyData);

    const holidayToday = useMemo(() => {
        for(let i = 0; i < holidayData.length; i++) {
            if(holidayData[i].date.iso == dateToday) {
                // console.log(holidayData[i].name);
                return holidayData[i].name;
            }
            else {
                // console.log("none today");
                return "None";
            }
        };
    }, [holidayData]);

    return (
        <div className="App">
            <Header />
            <h1 className="appTitle">TEST</h1>
        </div>);

}

export default Home;