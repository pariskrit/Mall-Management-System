import { useState, useEffect } from "react";

const useFilterData = (datas) => {
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState(datas);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  const setInputValue = (value) => {
    setFilteredData(
      value.length === 0
        ? allData
        : allData.filter(
            (data) => data.title.slice(0, value.length).toLowerCase() === value
          )
    );
  };

  return { filteredData, setAllData, setInputValue };
};

export default useFilterData;
