const Filter = (props) => {
  return (
    <form>
      filter shows with{" "}
      <input value={props.searchName} onChange={props.handleSearchChange} />
    </form>
  );
};

export default Filter
