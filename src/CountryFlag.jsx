import ReactCountryFlag from "react-country-flag"
import React from "react"

const styles = {
    flag: {
        fontSize: '10em',
    }
}

const CountryFlag = (props) => {
    const { country } = { ...props }

    return (
        <ReactCountryFlag svg countryCode={`${country.code}`} style={styles.flag} className={`flag-${country.name}`} />
    )
}

export default CountryFlag