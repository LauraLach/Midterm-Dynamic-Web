import React from "react";

function Header() {
    return (
        <header className="header">
            <a href="/?country=Australia&countryID=AU&currency=AUD">Australia</a>
            <a href="/?country=Canada&countryID=CA&currency=CAD">Canada</a>
            <a href="/?country=Japan&countryID=JP&currency=JPY">Japan</a>
            <a href="/?country=Spain&countryID=ES&currency=EUR">Spain</a>
        </header>
    )
}

export default Header;