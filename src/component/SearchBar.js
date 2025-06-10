import { useState } from "react";

export default function SearchBar({ allObjs, setObjs, objName }) {
  const [searchTerm, setSearchTerm] = useState("");

  function searchChangeHandler(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setObjs(allObjs); // Reset to original list
    } else {
      const filtered = allObjs.filter((obj) =>
        obj[objName]?.toLowerCase().startsWith(value.toLowerCase())
      );
      setObjs(filtered);
    }
  }

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Search"
        className="searchBar"
        value={searchTerm}
        onChange={searchChangeHandler}
      />
    </div>
  );
}
