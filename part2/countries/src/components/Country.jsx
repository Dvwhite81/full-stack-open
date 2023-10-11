/* eslint-disable react/prop-types */
const Country = ({ country, onlyCountry }) => {
  if (!onlyCountry) {
    return <p>{country.name.common}</p>;
  } else {
    return (
      <div className="container">
        <div className="left">
          <h2>{country.name.common}</h2>
          <div>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
          </div>
          <h3>languages:</h3>
          <div>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
				<div className="right">
					<img src={country.flags.png} />
				</div>
      </div>
    );
  }
};

export default Country;
