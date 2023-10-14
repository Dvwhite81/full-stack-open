import Person from "./Person";

const Persons = ({ persons, searchFilter, deletePerson }) => {
  persons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;
