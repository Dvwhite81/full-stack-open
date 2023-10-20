/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    countryService.getAll().then((countries) => setCountries(countries));
  }, [searchName]);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleShowCountry = (country) => {
    let temp = searchName;
    setSearchName(country.name.common);
    showCloseButton(temp);
  };

  const showCloseButton = (temp) => {
    const button = document.querySelector("#close-show-country");
    button.style.visibility = "visible";
    button.onclick = () => hideCloseButton(button, temp);
  };

  const hideCloseButton = (button, temp) => {
    button.style.visibility = "hidden";
    setSearchName(temp);
  };

  return (
    <div>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <Countries
        countries={countries}
        searchName={searchName}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
}

export default App;
