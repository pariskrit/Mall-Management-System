import React, { useState, useEffect, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import { getImageUrl } from "../../utils/getImageUrl";
import {
  deleteShopImageFromStorage,
  updateShop,
} from "../../utils/firebaseCrud";
import Success from "../Success/Success";
import { Context } from "../../context/ContextProvider";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useForm } from "react-hook-form";
import Shopform from "./AddShopform";

function EditShopForm({ allDatas }) {
  const [{ shopDetails }, dispatch] = useContext(Context);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shopToEdit, setShopToEdit] = useState({});
  const { mallid, shopid } = useParams();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    let editedShopData = {};
    const removedImages = [];
    const mallToUpdate = allDatas.find((mall) => mall.id === mallid);
    const isNewImages = shopDetails[0].shopImages.filter(
      (image) => image?.image?.name
    );
    for (let i = 0; i <= shopToEdit.shopImages.length - 1; i++) {
      if (
        shopDetails[0].shopImages.findIndex(
          (image) => image.id === shopToEdit.shopImages[i].id
        ) === -1
      ) {
        removedImages.push(shopToEdit.shopImages[i]);
      }
    }
    if (removedImages.length > 0) {
      await deleteShopImageFromStorage(removedImages);
    }
    if (isNewImages.length > 0) {
      const { shopsurl } = await getImageUrl(isNewImages);
      editedShopData = {
        ...shopDetails[0],
        shopImages: [
          ...shopDetails[0].shopImages.filter((image) => !image?.image?.name),
          ...shopsurl.map((url, index) => ({
            id: isNewImages[index].id,
            imageName: isNewImages[index].imageName,
            url,
          })),
        ],
      };
    } else {
      editedShopData = {
        ...shopDetails[0],
        shopImages: [...shopDetails[0].shopImages],
      };
    }
    //Updating the shop
    updateShop(mallid, mallToUpdate, shopid, editedShopData);

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    setIsSubmitted(false);
    dispatch({ type: "Reset_ShopDetails" });
  };

  useEffect(() => {
    const selectedMall = allDatas.find((mall) => mall.id === mallid);
    const shopEdit = selectedMall?.shops.find((shop) => shop.id === +shopid);
    setShopToEdit(shopEdit);
    dispatch({ type: "Save_Shops", payload: [shopEdit] });

    return () => dispatch({ type: "Reset_ShopDetails" });
  }, [allDatas]);

  useEffect(() => {
    reset({
      shops: shopDetails?.map((shop) => ({
        title: shop?.title,
        description: shop?.description,
        shopImages: "something",
      })),
    });
  }, [shopDetails]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Shop</h1>

        <Shopform
          control={control}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          errors={errors}
          getValues={getValues}
          isEdit
        />
        {isSubmitted && <Loader />}
        {isSuccess && <Success />}
        <Button
          type="submit"
          className="form__button"
          color="secondary"
          variant="contained"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditShopForm;
