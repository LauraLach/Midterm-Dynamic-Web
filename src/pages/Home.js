import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { CURRENCY_API_KEY, HOLIDAY_API_KEY } from "../API_KEYS";
import Header from '../components/Header';
import LocationInfo from '../components/LocationInfo';

function Home() {
    const [currencyData, setCurrencyData] = useState({});
    const [holidayData, setHolidayData] = useState({});
    const [searchParams] = useSearchParams();
    const [country, setCountry] = useState('');
    const [countryID, setCountryID] = useState('');
    const [currency, setCurrency] = useState(''); 
    let dateToday = new Date().toISOString().slice(0,10);
    let currentYear = new Date().getFullYear();

useEffect(() => {
    const countryIDToQuery = searchParams.get("countryID") || countryID;
    setCountryID(countryIDToQuery);
    const countryToQuery = searchParams.get("country") || country;
    setCountry(countryToQuery);
    const currencyToQuery = searchParams.get("currency") || currency;
    setCurrency(currencyToQuery);

    axios
        .get(`https://calendarific.com/api/v2/holidays?&api_key=${HOLIDAY_API_KEY}&country=${countryIDToQuery}&year=${currentYear}`)
        .then(function (response) {
            setHolidayData(response.data.response.holidays);
        })
        .catch(function (error) {
            console.warn(error);
            setHolidayData({});
        });
    axios
        .get(`https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/${currencyToQuery}`)
        .then(function (response) {
            const responseUndefinedTest = response.data && response.data.conversion_rates;
            const usdRate = responseUndefinedTest && responseUndefinedTest.USD;
            setCurrencyData(usdRate.toFixed(2));
            console.log("response", response);
        })
        .catch(function (error) {
            console.warn(error);
            setCurrencyData({});
        });
    }, []);

    const holidayToday = useMemo(() => {
        for(let i = 0; i < holidayData.length; i++) {
            if(holidayData[i].date.iso == dateToday) {
                return holidayData[i].name;
            }
            else {
                return "None";
            }
        };
    }, [holidayData]);

    return (
        <div className="App">
            <Header />
            <LocationInfo 
                country={country}
                currencyRate={currencyData}
                currencyType={currency}
                holiday={holidayToday}
            />
        </div>);
}

export default Home;