import React from "react";
import "./imageupload.css";
import PublishIcon from "@material-ui/icons/Publish";

function ImageUpload(props) {
  return (
    <div class="file-input">
      <input {...props} id={props.name + props.id} className="file" />
      <label htmlFor={props.name + props.id}>
        <PublishIcon />
        Upload Images
      </label>
    </div>
  );
}

export default ImageUpload;
