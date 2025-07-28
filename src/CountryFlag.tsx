import ReactCountryFlag from "react-country-flag"
import './Styles/index.css'
import { CountryFlagProps } from "./Types/types";

export default function CountryFlag({ country }: CountryFlagProps) {
    return (
        <ReactCountryFlag svg countryCode={`${country.code}`} id={`flag-${country.name}`} />
    )
}