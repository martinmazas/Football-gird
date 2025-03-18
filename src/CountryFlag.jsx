import ReactCountryFlag from "react-country-flag"
import React from "react"
import './Styles/index.css'

export default function CountryFlag(props) {
    const { country } = { ...props }

    return (
        <ReactCountryFlag svg countryCode={`${country.code}`} id={`flag-${country.name}`} />
    )
}