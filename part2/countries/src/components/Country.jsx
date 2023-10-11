/* eslint-disable react/prop-types */
import Weather from "./Weather";

const Country = ({ country, onlyCountry, handleShowCountry }) => {
  if (!onlyCountry) {
    return (
      <div className="country-list">
        <p>{country.name.common}</p>
        <button
          onClick={() => {
            handleShowCountry(country);
          }}
        >
          show
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="country-info">
          <h2>{country.name.common}</h2>
          <div>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
          </div>
        </div>
        <div className="language-info">
          <h2>languages:</h2>
          <div>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flag-info">
          <img className="flag-img" src={country.flags.png} />
        </div>
        <Weather country={country} />
      </div>
    );
  }
};

export default Country;
