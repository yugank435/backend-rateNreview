import { City, Country, State } from "country-state-city";

export const getCountries = () =>
  Country.getAllCountries().map((country) => ({
    name: country.name,
    isoCode: country.isoCode
  }));

export const getStates = (countryCode: string) =>
  State.getStatesOfCountry(countryCode).map((state) => ({
    name: state.name,
    isoCode: state.isoCode,
    countryCode: state.countryCode
  }));

export const getCities = (countryCode: string, stateCode: string) =>
  City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    name: city.name,
    stateCode: city.stateCode,
    countryCode: city.countryCode
  }));

export const findCountryByName = (countryName: string) =>
  Country.getAllCountries().find((country) => country.name.toLowerCase() === countryName.toLowerCase());

export const findStateByName = (countryCode: string, stateName: string) =>
  State.getStatesOfCountry(countryCode).find((state) => state.name.toLowerCase() === stateName.toLowerCase());

export const isKnownLocation = (cityName: string, stateName: string, countryName: string) => {
  const country = findCountryByName(countryName);
  if (!country) return false;

  const state = findStateByName(country.isoCode, stateName);
  if (!state) return false;

  return City.getCitiesOfState(country.isoCode, state.isoCode).some(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
};
