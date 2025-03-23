import { useEffect, useState } from "react";

const Records = ({ onDataFetched }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/fetch/ds")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data["data"].map((item) => ({
          IDX: item.IDX,
          EMP_NAME: item.EMP_NAME,
          DATE: item.DATE,
          TIME: item.TIME,
          REASON: item.REASON,
        }));
        setData(filteredData);
        if (typeof onDataFetched === "function") {
          onDataFetched(filteredData);
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [onDataFetched]);

  return data;
};

export default Records;
