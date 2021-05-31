import { deleteShopImageFromStorage } from "./firebaseCrud";
import { getImageUrl } from "./getImageUrl";

export const updateShop = async (shopDetails, shopToEdit) => {
  let editedShopData = {};
  const removedImages = [];
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

  return editedShopData;
};
