import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import NewPerson from "./components/NewPerson";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const getNextOpenId = (id = 0) => {
    let taken = persons.find((x) => x.id === id);
    if (taken !== undefined) {
      return getNextOpenId(id + 1);
    } else {
      return id;
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName.length) return alert("Name cannot be blank");

    const personToAdd = persons.filter((person) => person.name === newName)[0];
    if (personToAdd) {
      if (window.confirm(`Replace ${newName}'s number with ${newNumber}?`)) {
        const person = persons.find((p) => p.id === personToAdd.id);
        const id = person.id;
        const changedPerson = { ...person, number: newNumber };

        personService.update(id, changedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: getNextOpenId(),
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.filter((person) => person.id === id)[0];
    const deleteId = personToDelete.id;
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(deleteId);
      setPersons(persons.filter((person) => person.id !== deleteId));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <NewPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
