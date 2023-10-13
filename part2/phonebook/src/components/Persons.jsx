import Person from "./Person";

const Persons = ({ persons, searchName, deletePerson }) => {
  return (
    <>
		{persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())).map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
    </>
  );
};

export default Persons;
