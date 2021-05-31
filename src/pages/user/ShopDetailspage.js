import React from "react";
import Shop from "../../components/Shop/Shop";
function ShopDetailspage({ location }) {
  const {
    state: { shop },
  } = location;
  return (
    <>
      <Shop shops={shop} />
    </>
  );
}

export default ShopDetailspage;
