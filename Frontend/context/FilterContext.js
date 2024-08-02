import React, { createContext, useContext, useState } from "react";

// Context ve Provider oluşturma
const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const saveCategories = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <FilterContext.Provider value={{ selectedCategories, saveCategories }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
