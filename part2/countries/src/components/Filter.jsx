/* eslint-disable react/prop-types */
import CloseButton from "./CloseButton";

const Filter = ({ searchName, handleSearchChange }) => {
  return (
    <div className="search-div">
      <form>
        find countries{" "}
        <input value={searchName} onChange={handleSearchChange} />
      </form>
      <CloseButton />
    </div>
  );
};

export default Filter;
