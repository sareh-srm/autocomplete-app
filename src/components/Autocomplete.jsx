import React, { useEffect, useState } from "react";

const SearchableSelect = ({ options, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([...options]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [options, searchQuery]);

  const handleSelect = (e) => {
    onSelect(e.target.value);
    setSearchQuery("");
  };

  return (
    <select value={searchQuery} onChange={handleSelect}>
      {filteredOptions.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Autocomplete = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setOptions(data.map((post) => ({ value: post.id, label: post.title })));
    } catch (error) {
      console.error("Error fetching data", error);
      setOptions([]);
    }
  };

  //fetch data when the component mounts
  useEffect(() => {
    fetchOptions();
  }, []);

  const handleSelect = (value) => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected);
  };

  return (
    <>
      <SearchableSelect options={options} onSelect={handleSelect} />
      {selectedOption && <p>You selected: {selectedOption.label}</p>}
    </>
  );
};

export default Autocomplete;
