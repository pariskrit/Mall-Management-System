import { Button } from "@material-ui/core";
import React, { useState, useContext } from "react";
import Loader from "../Loader/Loader";
import "./addform.css";
import Shopform from "./AddShopform";
import { projectStorage } from "../../firebase/config";
import { Context } from "../../context/ContextProvider";
import AddMallform from "./AddMallform";
import { getAllImageUrl } from "../../utils/getImageUrl";
import { addMallAndShop } from "../../utils/firebaseCrud";
import { useForm } from "react-hook-form";

function AddForm() {
  const [{ shopDetails, mallDetails }, dispatch] = useContext(Context);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddMoreShop = () => {
    dispatch({ type: "Add_ShopFields" });
  };

  const onSubmit = async (data) => {
    setIsSubmitted(true);

    /* storing mall image in storage and getting url */
    await projectStorage
      .ref(mallDetails.image.id + mallDetails.image.image.name)
      .put(mallDetails.image.image);
    const mallurl = await projectStorage
      .ref(mallDetails.image.id + mallDetails.image.image.name)
      .getDownloadURL();

    const { shopsurl } = await getAllImageUrl(shopDetails);

    /*saving all data to firestore*/
    addMallAndShop(mallDetails, mallurl, shopDetails, shopsurl);

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    setIsSubmitted(false);
    dispatch({ type: "Reset_ShopDetails" });
  };

  return (
    <div className="addform">
      <h1 className="addform__heading">Add Mall</h1>
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

        <h1 className="addform__heading">Add Shops</h1>

        <Shopform
          handleAddMoreShop={handleAddMoreShop}
          control={control}
          register={register}
          setValue={setValue}
          getValues={getValues}
          handleSubmit={handleSubmit}
          errors={errors}
        />
        {isSubmitted && <Loader />}
        {isSuccess && <div className="alert__success">SuccessFully Saved!</div>}
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

export default AddForm;
