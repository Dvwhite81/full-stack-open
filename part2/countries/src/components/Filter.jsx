/* eslint-disable react/prop-types */
const Filter = ({ searchName, handleSearchChange }) => {
	return (
		<form>
			find countries <input value={searchName} onChange={handleSearchChange} />
		</form>
	)
}

export default Filter
