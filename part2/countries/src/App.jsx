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
    countryService
      .getAll()
      .then(countries => setCountries(countries))
  })

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} searchName={searchName} />
    </div>
  )
}

export default App;
