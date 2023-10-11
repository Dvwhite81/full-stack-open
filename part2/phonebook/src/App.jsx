/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import NewPerson from "./components/NewPerson";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const getNextOpenId = (id = 0) => {
    let taken = persons.find(x => x.id === id);
    if (taken !== undefined) {
      return getNextOpenId(id + 1)
    }
    else {
      return id
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName.length) {
      setErrorMessage('Name cannot be blank')
      setTimeout(() =>{
        setErrorMessage(null)
      }, 3000)
      return
    }

    const personToAdd = persons.filter(person => person.name === newName)[0]
    if (personToAdd) {
      const updatedPersonObject = { ...personToAdd, number: newNumber }
      if (window.confirm(`Replace ${newName}'s number with ${newNumber}?`)) {
        personService
          .update(updatedPersonObject.id, updatedPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(eachPerson => eachPerson.id !== personToAdd.id ? eachPerson : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Number was updated for ${updatedPersonObject.name}`)
            setTimeout(() =>{
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`${updatedPersonObject.name} has already been removed from the server`)
            setTimeout(() =>{
              setErrorMessage(null)
            }, 3000)
          })
      }
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber,
      id: getNextOpenId()
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Entry added for ${personObject.name}`)
      setTimeout(() =>{
        setSuccessMessage(null)
      }, 3000)
    });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.filter((person) => person.id === id)[0];
    const deleteId = personToDelete.id;
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(deleteId);
      setPersons(persons.filter((person) => person.id !== deleteId));
      setSuccessMessage(`${personToDelete.name} was removed`)
      setTimeout(() =>{
        setSuccessMessage(null)
      }, 3000)
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
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
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
