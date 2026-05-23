"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKnownLocation = exports.findStateByName = exports.findCountryByName = exports.getCities = exports.getStates = exports.getCountries = void 0;
const country_state_city_1 = require("country-state-city");
const getCountries = () => country_state_city_1.Country.getAllCountries().map((country) => ({
    name: country.name,
    isoCode: country.isoCode
}));
exports.getCountries = getCountries;
const getStates = (countryCode) => country_state_city_1.State.getStatesOfCountry(countryCode).map((state) => ({
    name: state.name,
    isoCode: state.isoCode,
    countryCode: state.countryCode
}));
exports.getStates = getStates;
const getCities = (countryCode, stateCode) => country_state_city_1.City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    name: city.name,
    stateCode: city.stateCode,
    countryCode: city.countryCode
}));
exports.getCities = getCities;
const findCountryByName = (countryName) => country_state_city_1.Country.getAllCountries().find((country) => country.name.toLowerCase() === countryName.toLowerCase());
exports.findCountryByName = findCountryByName;
const findStateByName = (countryCode, stateName) => country_state_city_1.State.getStatesOfCountry(countryCode).find((state) => state.name.toLowerCase() === stateName.toLowerCase());
exports.findStateByName = findStateByName;
const isKnownLocation = (cityName, stateName, countryName) => {
    const country = (0, exports.findCountryByName)(countryName);
    if (!country)
        return false;
    const state = (0, exports.findStateByName)(country.isoCode, stateName);
    if (!state)
        return false;
    return country_state_city_1.City.getCitiesOfState(country.isoCode, state.isoCode).some((city) => city.name.toLowerCase() === cityName.toLowerCase());
};
exports.isKnownLocation = isKnownLocation;
