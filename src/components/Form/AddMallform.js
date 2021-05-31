import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import ImageUpload from "../ImageUpload/ImageUpload";

function AddMallform({
  mallDetails,
  dispatch,
  control,
  register,
  setValue,
  getValues,
  errors,
}) {
  console.log(mallDetails);
  return (
    <div className="shopform">
      <Controller
        control={control}
        name="mallname"
        defaultValue={getValues("mallname")}
        render={({ field: { onChange }, fieldState: { error, invalid } }) => (
          <TextField
            className="form__inputfield"
            type="text"
            label="Name Of The Mall"
            variant="outlined"
            name="title"
            value={mallDetails?.title}
            error={invalid}
            onChange={(e) => {
              onChange(e);
              dispatch({
                type: "handleMallInputChange",
                name: e.target.name,
                value: e.target.value,
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
        name="address"
        defaultValue={getValues("address")}
        render={({ field: { onChange }, fieldState: { error, invalid } }) => (
          <TextField
            className="form__inputfield"
            type="text"
            label="Address"
            variant="outlined"
            name="address"
            value={mallDetails?.address}
            error={invalid}
            onChange={(e) => {
              onChange(e);
              dispatch({
                type: "handleMallInputChange",
                name: e.target.name,
                value: e.target.value,
              });
            }}
            helperText={error?.message}
            fullWidth
          />
        )}
        rules={{ required: { value: true, message: "*Address is Required" } }}
      />
      <ImageUpload
        type="file"
        name="image"
        accept=".png, .jpg, .jpeg"
        {...register("image", {
          validate: (value) => mallDetails.image,
        })}
        onChange={(e) => {
          dispatch({
            type: "handleMallImageChange",
            name: e.target.name,
            value: e.target.files[0],
          });
        }}
      />

      <br />
      {errors?.image && (
        <span className="error">At Least One Image is Required</span>
      )}

      <ol>
        {mallDetails?.image && (
          <li>
            {mallDetails?.image?.imageName || mallDetails?.image?.image?.name}
          </li>
        )}
      </ol>
    </div>
  );
}

export default AddMallform;
