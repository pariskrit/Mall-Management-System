import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Block from "../../components/Block/Block";
import { useHistory } from "react-router";
import useFirestore from "../../firebase/useFirestore";
import Confirmation from "../../components/Modal/Confirmation";
import {
  deleteMall,
  deleteMallImageFromStorage,
} from "../../utils/firebaseCrud";

function AdminHomepage() {
  const history = useHistory();
  const { docs } = useFirestore("Malls");
  const [openModal, setOpenModal] = useState(false);
  const [mallId, setMallId] = useState(null);
  const [showViewAll, setShowViewAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async () => {
    const deletedMall = docs.find((mall) => mall.id === mallId);

    //delete mall from firestore
    deleteMall(mallId);

    //delete mall images from storage
    await deleteMallImageFromStorage(deletedMall);
    setOpenModal(false);
  };

  useEffect(() => {
    if (docs.length > 3) {
      setShowViewAll(true);
    }

    if (docs.length) {
      setIsLoading(false);
    }
  }, [docs]);
  return (
    <>
      <Navbar />
      <div className="admin__button" style={{ margin: "50px 0" }}>
        <Button
          className="addbutton"
          color="primary"
          variant="contained"
          size="large"
          onClick={() => history.push("/admin/addmall")}
        >
          Add New Mall
        </Button>
      </div>

      <Container
        heading="Malls"
        malls={docs.slice(0, 3)}
        showViewAll={showViewAll}
        isLoading={isLoading}
        render={(malls) =>
          malls?.map((mall) => (
            <Block
              key={mall.id}
              title={mall.title}
              subTitle={mall.address}
              image={mall.image}
              isAdmin="true"
              handleClick={() => history.push("/admin/malls/" + mall.id)}
              handleDelete={(e) => {
                e.stopPropagation();
                setOpenModal(true);
                setMallId(mall.id);
              }}
            />
          ))
        }
        path="/admin/allmalls"
      />
      <Container
        heading="Shops"
        malls={docs.slice(0, 3)}
        showViewAll={showViewAll}
        isLoading={isLoading}
        render={(malls) =>
          malls?.map((mall) => (
            <Block
              key={mall?.id}
              title={mall?.shops[0]?.title}
              subTitle={mall?.title}
              image={mall?.shops[0]?.shopImages[0]}
              handleClick={() =>
                history.push("/admin/shop", { shop: mall?.shops[0] })
              }
              isAdmin="true"
            />
          ))
        }
        path="/admin/allshops"
      />
      <Confirmation
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default AdminHomepage;
