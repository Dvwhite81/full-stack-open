const Person = ({ person, deletePerson }) => {
  return (
    <div className="numbers-person">
      <p>{person.name}</p><p>{person.number}</p>
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  );
};

export default Person;
