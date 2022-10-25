import React from "react";

function Header() {
    return (
        <header className="header">
            <a href="/?country=AU">Australia</a>
            <a href="/?country=CA">Canada</a>
            <a href="/?country=JP">Japan</a>
            <a href="/?country=ES">Spain</a>
        </header>
    )
}

export default Header;