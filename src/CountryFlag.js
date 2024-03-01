import ReactCountryFlag from "react-country-flag"
import { markCell } from "./Utils/functions"

const styles = {
    flag: {
        fontSize: '15em'
    }
}

const CountryFlag = (props) => {
    const {country, cellIndex, table} = {...props}
    
    markCell(table, cellIndex, 0)

    return (
        <ReactCountryFlag svg countryCode={`${country.code}`} style={styles.flag} className={`flag-${country.name}`} />
    )
}

export default CountryFlag