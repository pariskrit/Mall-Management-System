import React, { useEffect } from "react";
import { useHistory } from "react-router";
import useFirestore from "../../firebase/useFirestore";
import useFilterData from "../../hooks/useFilterData";
import Block from "../Block/Block";
import Container from "../Container/Container";
import InputField from "../InputField/InputField";

function MallsLists({ isAdmin = false }) {
  const history = useHistory();
  const { docs } = useFirestore("Malls");
  const { filteredData, setAllData, setInputValue } = useFilterData();

  useEffect(() => {
    setAllData(docs);
  }, [docs]);

  return (
    <div>
      <InputField
        placeholder="Search Malls..."
        onSearchInputChange={(e) => setInputValue(e.target.value)}
      />
      <Container
        heading="Malls"
        malls={filteredData}
        removeViewAll
        render={(malls) =>
          malls?.map((mall) => (
            <Block
              key={mall.id}
              title={mall.title}
              subTitle={mall.address}
              image={mall.image}
              handleClick={() => history.push("/user/malls/" + mall.id)}
              isAdmin={isAdmin}
            />
          ))
        }
      />
    </div>
  );
}

export default MallsLists;
