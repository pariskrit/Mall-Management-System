import { Button } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import Loader from "../Loader/Loader";
import "./addform.css";
import Shopform from "./AddShopform";
import { projectStorage, projectFirestore } from "../../firebase/config";
import { Context } from "../../context/ContextProvider";
import AddMallform from "./AddMallform";
import Success from "../Success/Success";
import { updateShop } from "../../utils/updateForm";
import { useForm } from "react-hook-form";

function EditMallForm({ mallid }) {
  const [{ shopDetails, mallDetails }, dispatch] = useContext(Context);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [oldShopDetails, setOldShopDetails] = useState({});
  const [oldMallImage, setOldMallImage] = useState({});
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    let updatedShopLists = [];

    // Updating ShopDetails
    for (let i = 0; i <= shopDetails.length - 1; i++) {
      const editedShopData = await updateShop(
        [shopDetails[i]],
        oldShopDetails[i]
      );
      updatedShopLists.push(editedShopData);
    }

    mallDetails.shops = updatedShopLists;

    // Updating Mall Details
    const isNewMallImage = mallDetails?.image?.image?.name;

    if (isNewMallImage) {
      await projectStorage
        .ref(mallDetails.image.id + mallDetails.image.image.name)
        .put(mallDetails.image.image);
      const mallurl = await projectStorage
        .ref(mallDetails.image.id + mallDetails.image.image.name)
        .getDownloadURL();

      await projectStorage
        .ref()
        .child(oldMallImage.id + oldMallImage.image.name)
        .delete();

      mallDetails.image = {
        id: mallDetails.image.id,
        imageName: mallDetails.image.image.name,
        url: mallurl,
      };
    }

    projectFirestore
      .collection("Malls")
      .doc(mallid)
      .update(mallDetails)
      .then(() => console.log("edited"))
      .then((error) => console.log(error));

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    setIsSubmitted(false);
  };

  useEffect(() => {
    setOldShopDetails(mallDetails.shops);
    setOldMallImage(mallDetails.image);

    //used for form validation react-hook-form
    reset({
      mallname: mallDetails.title,
      address: mallDetails.address,

      shops: shopDetails.map((shop) => ({
        title: shop.title,
        description: shop.description,
      })),
    });
  }, [mallDetails, reset]);

  return (
    <div className="addform">
      <h1 className="addform__heading">Edit Mall</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <AddMallform
          mallDetails={mallDetails}
          dispatch={dispatch}
          control={control}
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
        />

        <h1 className="addform__heading">Edit Shops</h1>

        <Shopform
          shopDetails={shopDetails}
          dispatch={dispatch}
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
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditMallForm;
