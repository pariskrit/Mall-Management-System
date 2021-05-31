import React, { useState, useEffect, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import "./addform.css";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import { getAllImageUrl } from "../../utils/getImageUrl";
import { addShop } from "../../utils/firebaseCrud";
import Success from "../Success/Success";
import { Controller } from "react-hook-form";
import { Context } from "../../context/ContextProvider";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ImageUpload from "../ImageUpload/ImageUpload";

function Shopform({
  isShopsOnly = false,
  handleAddMoreShop,
  setValue,
  handleSubmit,
  control,
  errors,
  register,
  getValues,
  isEdit,
}) {
  const { mallid } = useParams();
  const [{ shopDetails, allDatas }, dispatch] = useContext(Context);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const shopImages = register("shopImages");

  const onSubmit = async (data) => {
    const mallToUpdate = allDatas.find((mall) => mall.id === mallid);
    setIsSubmitted(true);

    //get image url from storage
    const { shopsurl } = await getAllImageUrl(shopDetails);

    const newShop = shopDetails.map((shop, i) => ({
      ...shop,
      id: Date.now() + i,
      shopImages: shopsurl[i].map((url, index) => ({
        id: shopDetails[i].shopImages[index].id,
        imageName: shopDetails[i].shopImages[index].image.name,
        url,
      })),
    }));

    // adding shopdetails to firestore
    addShop(mallid, mallToUpdate, newShop);

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setIsSubmitted(false);
    dispatch({ type: "Reset_ShopDetails" });
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "Reset_ShopDetails" });
      dispatch({ type: "Reset_MallDetails" });
    };
  }, []);

  return (
    <form
      className={isShopsOnly ? `form` : undefined}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isShopsOnly && <h1>Add Shops</h1>}
      {shopDetails?.map((shop, index) => (
        <div className="shopform" key={shop?.id}>
          <Controller
            control={control}
            name={`shops[${index}].title`}
            defaultValue={getValues(`shops[${index}].title`)}
            render={({
              field: { onChange },
              fieldState: { error, invalid },
            }) => (
              <TextField
                className="form__inputfield"
                type="text"
                label="Shop Name"
                variant="outlined"
                value={shop?.title}
                name="title"
                error={invalid}
                onChange={(e) => {
                  onChange(e);
                  dispatch({
                    type: "handleShopInputChange",
                    name: e.target.name,
                    value: e.target.value,
                    id: index,
                  });
                }}
                helperText={error?.message}
                fullWidth
              />
            )}
            rules={{ required: { value: true, message: "*Name is Required" } }}
          />
          <Controller
            control={control}
            name={`shops[${index}].description`}
            defaultValue={getValues(`shops[${index}].description`)}
            render={({
              field: { onChange },
              fieldState: { error, invalid },
            }) => (
              <TextField
                className="form__inputfield"
                type="text"
                label="Description"
                variant="outlined"
                name="description"
                value={shop?.description}
                error={invalid}
                onChange={(e) => {
                  onChange(e);
                  dispatch({
                    type: "handleShopInputChange",
                    name: e.target.name,
                    value: e.target.value,
                    id: index,
                  });
                }}
                helperText={error?.message}
                fullWidth
              />
            )}
            rules={{
              required: { value: true, message: "*Description is Required" },
            }}
          />

          <br />
          <ImageUpload
            id={index}
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            {...register(`shopImages[${index}].images`, {
              validate: (value) =>
                shop.shopImages.length > 0 || value?.length > 0,
            })}
            onChange={(e) => {
              shopImages.onChange(e);
              dispatch({
                type: "handleShopImagesEditChange",
                name: "shopImages",
                value: e.target.files,
                id: index,
              });
            }}
          />

          <br />
          {errors.shopImages &&
            errors?.shopImages[index]?.images?.ref.name ===
              `shopImages[${index}].images` && (
              <span className="error">At Least One Image Is Required</span>
            )}
          <ol>
            {shop?.shopImages?.length > 0 &&
              shop?.shopImages?.map((image) =>
                isEdit ? (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "10px 0",
                    }}
                  >
                    {image.imageName}
                    <p
                      style={{
                        color: "red",
                        fontWeight: "800",
                        margin: "0 10px",
                        cursor: "pointer",
                        paddingTop: "5px",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "handleShopImagesRemove",
                          id: image.id,
                          index,
                        })
                      }
                    >
                      <HighlightOffIcon />
                    </p>
                  </li>
                ) : (
                  <li>{image.imageName || image.image.name}</li>
                )
              )}
          </ol>
        </div>
      ))}

      {!isEdit && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSubmit(() => {
            handleAddMoreShop();
          })}
        >
          Add More
        </Button>
      )}

      {isSubmitted && <Loader />}
      {success && <Success />}

      {isShopsOnly && (
        <Button
          type="submit"
          className="form__button"
          color="secondary"
          variant="contained"
        >
          Save
        </Button>
      )}
    </form>
  );
}

export default Shopform;
