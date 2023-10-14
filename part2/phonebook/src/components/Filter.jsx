const Filter = ({ searchFilter, handleSearchChange }) => {
  return (
    <form>
      filter shown with:{" "}
      <input value={searchFilter} onChange={handleSearchChange} />
    </form>
  );
};

export default Filter;
