/* eslint-disable react/prop-types */
import Country from "./Country";

const Countries = ({ countries, searchName }) => {
	if (searchName === '') {
		return null
	}

	const matchingCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchName.toLowerCase()))
	console.log('matchingCountries', matchingCountries);


	if (matchingCountries.length > 10) return <p>Too many matches, specify another filter</p>
	if (matchingCountries.length === 1) return <Country country={matchingCountries[0]} onlyCountry={true} />

	return (
		<>
			{matchingCountries.map(country => (
				<Country key={country.ccn3} country={country} onlyCountry={false} />
			))}
		</>
	)
};

export default Countries;
