/* eslint-disable react/prop-types */
import Person from "./Person";

const Persons = ({ persons, searchName, deletePerson }) => {
  return (
    <>
		{persons.filter(person => person.name.includes(searchName)).map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
    </>
  );
};

export default Persons;
