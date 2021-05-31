import React, { useEffect, useState } from "react";
import Container from "../Container/Container";
import { useHistory, useParams } from "react-router";
import Block from "../Block/Block";
import InputField from "../InputField/InputField";
import "./shoplists.css";
import { Button } from "@material-ui/core";
import Confirmation from "../Modal/Confirmation";
import {
  deleteShop,
  deleteShopImageFromStorage,
} from "../../utils/firebaseCrud";
import useFilterData from "../../hooks/useFilterData";

function Shoplists({ isAdmin, selectedMall }) {
  const { mallid } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [shopId, setShopId] = useState(null);
  const history = useHistory();
  const { filteredData, setAllData, setInputValue } = useFilterData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllData(selectedMall?.shops);
  }, [selectedMall]);

  useEffect(() => {
    if (filteredData?.length > 0) {
      setIsLoading(false);
    }
  }, [filteredData]);

  const handleDelete = async () => {
    const shopsAfterDeleted = selectedMall.shops.filter(
      (shop) => shop.id !== shopId
    );
    const deletedShop = selectedMall.shops.find((shop) => shop.id === shopId);

    //delete shop from firestore
    deleteShop(mallid, shopsAfterDeleted);

    //delete shop images from storage
    await deleteShopImageFromStorage(deletedShop.shopImages);

    setOpenModal(false);
  };

  return (
    <div className="shoplists">
      <div className="shoplists__headings">
        <h1>{selectedMall?.title}</h1>
        <h2>{selectedMall?.address}</h2>
      </div>
      <InputField
        placeholder="Search Shops..."
        onSearchInputChange={(e) => setInputValue(e.target.value)}
      />

      {isAdmin && (
        <div className="shoplists__buttons">
          <Button
            ClassName="addbutton"
            color="primary"
            variant="contained"
            size="large"
            onClick={() => history.push(`/admin/${mallid}/addshop`)}
          >
            Add Shops
          </Button>
          <Button
            className="addbutton"
            color="primary"
            variant="contained"
            size="large"
            onClick={() => history.push(`/admin/${mallid}/editmall`)}
          >
            Update Mall
          </Button>
        </div>
      )}

      <Container
        heading="Shops"
        malls={filteredData}
        isLoading={isLoading}
        render={(shops) =>
          shops?.map((shop) => (
            <Block
              key={shop.id}
              id={shop.id}
              title={shop.title}
              image={shop.shopImages[0]}
              handleClick={() =>
                history.push(
                  isAdmin
                    ? `/admin/malls/${mallid}/${shop.id}`
                    : `/user/malls/${mallid}/${shop.id}`,
                  { shopid: shop.id, mallid }
                )
              }
              handleDelete={(e) => {
                e.stopPropagation();
                setOpenModal(true);
                setShopId(shop.id);
              }}
              isAdmin={isAdmin}
            />
          ))
        }
      />
      <Confirmation
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Shoplists;
