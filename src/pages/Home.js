import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { CURRENCY_API_KEY, HOLIDAY_API_KEY } from "../API_KEYS";
// import WeatherCard from '../components/WeatherCard';
// import Header from '../components/Header';

function Home() {
    const [currencyData, setCurrencyData] = useState({});
    const [holidayData, setHolidayData] = useState({});
    const [searchParams] = useSearchParams();
    const [country, setCountry] = useState('Canada'); 


// console.log("searchParams", searchParams.get("country"));
// console.log(`https://calendarific.com/api/v2/holidays?&api_key=${HOLIDAY_API_KEY}&country=CA&year=2022`)

useEffect(() => {
    const countryToQuery = searchParams.get("country") || country;
    setCountry(countryToQuery);
    axios
        .get(`https://calendarific.com/api/v2/holidays?&api_key=${HOLIDAY_API_KEY}&country=CA&year=2022`)
        .then(function (response) {
            setHolidayData(response.data);
            console.log(response);
        })
        .catch(function (error) {
            console.warn(error);
            setHolidayData({});
        });
    }, []);
}
// console.log(holidayData);

export default Home;