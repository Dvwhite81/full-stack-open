/* eslint-disable react/prop-types */
import Person from "./Person";

const Persons = (props) => {
  return (
    <>
		{props.persons.filter(person => person.name.includes(props.searchName)).map(person => <Person key={person.id} name={person.name} number={person.number} />)}
    </>
  );
};

export default Persons;
