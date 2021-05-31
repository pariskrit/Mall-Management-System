export const initialState = {
  mallDetails: { title: "", address: "", image: "" },
  shopDetails: [{ title: "", description: "", shopImages: [] }],
  allDatas: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "handleShopInputChange":
      return {
        ...state,
        shopDetails: [
          ...state.shopDetails.map((shop, index) =>
            +action.id === index
              ? { ...shop, [action.name]: action.value }
              : shop
          ),
        ],
      };

    case "handleShopImagesChange":
      return {
        ...state,
        shopDetails: [
          ...state.shopDetails.map((shop, index) =>
            +action.id === index
              ? {
                  ...shop,
                  [action.name]: Object.values(
                    action.value
                  ).map((image, index) => ({ id: Date.now() + index, image })),
                }
              : shop
          ),
        ],
      };

    case "handleMallInputChange":
      return {
        ...state,
        mallDetails: { ...state.mallDetails, [action.name]: action.value },
      };

    case "handleMallImageChange":
      return {
        ...state,
        mallDetails: {
          ...state.mallDetails,
          [action.name]: { id: Date.now(), image: action.value },
        },
      };

    case "handleShopImagesEditChange":
      return {
        ...state,
        shopDetails: [
          ...state.shopDetails.map((shop, index) =>
            +action.id === index
              ? {
                  ...shop,
                  [action.name]: [
                    ...shop.shopImages,
                    ...Object.values(action.value).map((image, index) => ({
                      id: Date.now() + index,
                      image,
                      imageName: image.name,
                    })),
                  ],
                }
              : shop
          ),
        ],
      };

    case "handleShopImagesRemove":
      console.log(action.id, action.index);
      return {
        ...state,
        shopDetails: [
          ...state.shopDetails.map((shop, index) =>
            action.index === index
              ? {
                  ...shop,
                  shopImages: [
                    ...shop.shopImages.filter(
                      (image) => image.id !== action.id
                    ),
                  ],
                }
              : shop
          ),
        ],
      };

    case "Save_Shops":
      return {
        ...state,
        shopDetails: action.payload,
      };

    case "Save_Mall":
      return {
        ...state,
        mallDetails: action.payload,
      };

    case "Add_ShopFields":
      return {
        ...state,
        shopDetails: [
          ...state.shopDetails,
          { title: "", description: "", shopImages: [] },
        ],
      };

    case "Reset_ShopDetails":
      return {
        ...state,
        shopDetails: [{ title: "", description: "", shopImages: [] }],
      };

    case "Reset_MallDetails":
      return {
        ...state,
        mallDetails: { title: "", description: "", image: "" },
      };

    case "Save_AllData":
      return { ...state, allDatas: action.payload };

    default:
      return state;
  }
};
