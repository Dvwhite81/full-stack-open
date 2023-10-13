import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NewPerson from "./components/NewPerson";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setSuccessMessage(
              `Changed ${person.name}'s number to ${newNumber}`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
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
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.filter((person) => person.id === id)[0];
    const deleteId = personToDelete.id;
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(deleteId)
        .then((deletedPerson) => {
          setPersons(persons.filter((person) => person.id !== deleteId));
          setSuccessMessage(`Removed ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(`${newName} was already removed from phonebook`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        });
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
    <div className="main-container">
      <div className="phonebook-container">
        <h2>Phonebook</h2>
        <Notification message={successMessage} type="success" />
        <Notification message={errorMessage} type="error" />
        <Filter
          searchName={searchName}
          handleSearchChange={handleSearchChange}
        />
        <h3>add a new</h3>
        <NewPerson
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
        />
      </div>
      <div className="numbers-container">
        <h3>Numbers</h3>
        <Persons
          persons={persons}
          searchName={searchName}
          deletePerson={deletePerson}
        />
      </div>
    </div>
  );
};

export default App;
