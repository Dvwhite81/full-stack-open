import Person from "./Person";

const Persons = ({ persons, searchFilter }) => {
  persons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      {persons.map((person) => (
        <Person key={person} person={person} />
      ))}
    </div>
  );
};

export default Persons;
