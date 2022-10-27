import React from "react";

function LocationInfo( {country, currencyRate, currencyType, holiday} ) {
    return(
    <div className="infoWrapper">
        <div className="heroText">
            <h2>Travel to</h2>
            <h1>{country}!</h1>
        </div>
        <div className="locationInfo">
            <div className="currencyInfo">
                <h2>Currency type: {currencyType}</h2>
                <h2>1 {currencyType} = {currencyRate.toString()} USD</h2>
            </div>
            <div className="holidayInfo">
                <h2>Holiday today:</h2>
                <h2>{holiday}</h2>
            </div>
        </div>
    </div>
    )
}   

export default LocationInfo;