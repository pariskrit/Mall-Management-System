import React, { useState } from "react";
import "./block.css";
import CancelPresentationTwoToneIcon from "@material-ui/icons/CancelPresentationTwoTone";

function Block({
  title = "Title",
  subTitle = null,
  image,
  handleClick,
  handleDelete,
  isAdmin,
}) {
  const [showDescription, setShowDescription] = useState(true);

  return (
    <div
      className="block"
      onMouseEnter={() => setShowDescription(false)}
      onMouseLeave={() => setShowDescription(true)}
      onClick={handleClick}
    >
      <img src={image?.url} alt="mall" className="block__image" />
      {showDescription && (
        <div className="block__description">
          <h2>{title}</h2>
          {subTitle && <h2>{subTitle}</h2>}
        </div>
      )}
      {isAdmin && !showDescription && (
        <p className="block__deletebutton" onClick={handleDelete}>
          <CancelPresentationTwoToneIcon className="deleteicon" />
        </p>
      )}
    </div>
  );
}

export default Block;
