import React, { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import InputField from "../../components/InputField/InputField";
import Block from "../../components/Block/Block";
import { useHistory } from "react-router";
import useFirestore from "../../firebase/useFirestore";
import Navbar from "../../components/Navbar/Navbar";

function UserHomepage() {
  const history = useHistory();
  const { docs } = useFirestore("Malls");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (docs.length) {
      setIsLoading(false);
    }
  }, [docs]);
  return (
    <>
      <Navbar isUser />
      <InputField placeholder="Search Malls..." />

      <Container
        heading="Malls"
        malls={docs.slice(0, 3)}
        isLoading={isLoading}
        render={(malls) =>
          malls?.map((mall) => (
            <Block
              key={mall.id}
              title={mall.title}
              subTitle={mall.address}
              image={mall.image}
              handleClick={() => history.push("/user/malls/" + mall.id)}
            />
          ))
        }
      />
      <Container
        heading="Shops"
        malls={docs.slice(0, 3)}
        isLoading={isLoading}
        render={(malls) =>
          malls?.map((mall) => (
            <Block
              key={mall.id}
              title={mall.shops[0].title}
              subTitle={mall.title}
              image={mall.shops[0].shopImages[0]}
              handleClick={() =>
                history.push(`/user/shops`, { shop: mall.shops[0] })
              }
            />
          ))
        }
        path="/user/allshops"
      />
    </>
  );
}

export default UserHomepage;
