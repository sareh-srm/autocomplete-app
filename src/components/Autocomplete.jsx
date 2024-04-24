import React, { useEffect, useState } from "react";

const Autocomplete = () => {
  const [options, setOptions] = useState([]);

  //function to fetch data from api

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      // setOptions(data?.options ?? []); //assuming the api returns an array of options
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

  return (
    <>
      <select name="" id="">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Autocomplete;
