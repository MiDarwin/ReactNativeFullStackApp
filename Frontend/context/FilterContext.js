import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [onSave, setOnSave] = useState(() => () => {});

  return (
    <FilterContext.Provider
      value={{ selectedCategories, setSelectedCategories, onSave, setOnSave }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
