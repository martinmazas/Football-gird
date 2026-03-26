import ReactCountryFlag from "react-country-flag"
import { CountryFlagProps } from "../Types/types";

export default function CountryFlag({ country }: CountryFlagProps) {
    return (
        <div className="grid-label-card">
            <ReactCountryFlag svg countryCode={`${country.code}`} id={`flag-${country.name}`} />
            <span className="grid-label-card__name">{country.name}</span>
        </div>
    )
}