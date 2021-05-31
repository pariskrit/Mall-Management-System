import React from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import "./shop.css";

function Shop({ shops, mallid, isAdmin = false }) {
  const history = useHistory();

  return (
    <div className="shop">
      <div className="shop__headings">
        <h1>{shops?.title}</h1>
        <p>
          The group has established itself as the biggest footwear producing
          group in Nepal. In 1990, we launched a mid-priced, value for money
          brand called GOLDSTAR to service more price conscious markets.
          GOLDSTAR is a robust brand made with genuine materials and modern
          technology.
        </p>
      </div>
      {isAdmin && (
        <Button
          ClassName="addbutton"
          color="primary"
          variant="contained"
          size="large"
          onClick={() => history.push(`/admin/${mallid}/${shops.id}/editshop`)}
        >
          Edit Shop
        </Button>
      )}
      <div className="shop__container">
        <h1 className="shop__container__title">Images</h1>
        <div className="shop__images">
          {shops?.shopImages?.map((shop, index) => (
            <img key={index} src={shop.url} alt="imageess" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
