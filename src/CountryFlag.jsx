import ReactCountryFlag from "react-country-flag"
import React from "react"
import './index.css'

const CountryFlag = (props) => {
    const { country } = { ...props }

    return (
        <ReactCountryFlag svg countryCode={`${country.code}`} id={`flag-${country.name}`} />
    )
}

export default CountryFlag