import React, { useEffect, useState } from "react";
import useFirestore from "../../firebase/useFirestore";
import Container from "../../components/Container/Container";
import Block from "../../components/Block/Block";
import { useHistory } from "react-router";
import InputField from "../../components/InputField/InputField";
import useFilterData from "../../hooks/useFilterData";
import Navbar from "../../components/Navbar/Navbar";

function AllShopspage() {
  const { docs } = useFirestore("Malls");
  const history = useHistory();
  const { filteredData, setInputValue, setAllData } = useFilterData();

  useEffect(() => {
    setAllData(docs.map((mall) => [...mall.shops]).flat());
  }, [docs]);

  return (
    <>
      <Navbar isUser />
      <InputField
        placeholder="Search Shops..."
        onSearchInputChange={(e) => setInputValue(e.target.value)}
      />
      <Container
        heading="Shops"
        malls={filteredData}
        render={(shops) =>
          shops?.map((shop) => (
            <Block
              key={shop.id}
              id={shop.id}
              title={shop.title}
              image={shop.shopImages[0]}
              handleClick={() => history.push(`/user/malls/${shop.id}`)}
            />
          ))
        }
      />
    </>
  );
}

export default AllShopspage;
