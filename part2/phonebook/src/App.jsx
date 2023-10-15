import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import NewPersonForm from "./components/NewPersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personToAdd = persons.filter((person) => person.name === newName)[0];

    if (personToAdd) {
      updatePerson(personToAdd);
    } else {
      addPerson();
    }
  };

  const addPerson = () => {
    const personObject = { name: newName, number: newNumber };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setSuccessMessage(`Added ${newName} to phonebook`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.error(error.message);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });

    setNewName("");
    setNewNumber("");
  };

  const updatePerson = (personToAdd) => {
    if (
      window.confirm(
        `${newName} is already in phonebook, change number to ${newNumber}?`
      )
    ) {
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
          setSuccessMessage(`Updated ${person.name}'s number`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error(error.message);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });

      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (id) => {
    const person = persons.filter((person) => person.id === id)[0];
    const personId = person.id;
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(personId)
        .then((removedPerson) => {
          setPersons(persons.filter((person) => person.id !== personId));
          setSuccessMessage(`Removed ${person.name} from phonebook`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error(error.message);
          setErrorMessage(`${person.name} was already removed from phonebook`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
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
    setSearchFilter(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="phonebook-container">
        <h2>Phonebook</h2>
        <Notification message={successMessage} type="success" />
        <Notification message={errorMessage} type="error" />
        <Filter
          searchFilter={searchFilter}
          handleSearchChange={handleSearchChange}
        />
        <h2>add a new</h2>
        <NewPersonForm
          addPerson={handleAddPerson}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <div className="numbers-container">
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          searchFilter={searchFilter}
          deletePerson={deletePerson}
        />
      </div>
    </div>
  );
};

export default App;
