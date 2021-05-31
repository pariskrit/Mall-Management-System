import { projectFirestore, projectStorage } from "../firebase/config";

export const addMallAndShop = (mallDetails, mallurl, shopDetails, shopsurl) => {
  projectFirestore.collection("Malls").add({
    title: mallDetails.title,
    address: mallDetails.address,
    image: {
      id: mallDetails.image.id,
      imageName: mallDetails.image.image.name,
      url: mallurl,
    },
    shops: shopDetails.map((shop, index) => ({
      id: Date.now() + index,
      title: shop.title,
      description: shop.description,
      shopImages: shopsurl[index].map((url, i) => ({
        id: shopDetails[index].shopImages[i].id,
        imageName: shopDetails[index].shopImages[i].image.name,
        url,
      })),
    })),
  });
};

export const addShop = (mallid, mallToUpdate, newShop) => {
  projectFirestore
    .collection("Malls")
    .doc(mallid)
    .update({
      shops: [...mallToUpdate.shops, ...newShop],
    })
    .then(() => console.log("sucessfull"))
    .catch((error) => console.log(error));
};

export const updateShop = (mallid, mallToUpdate, shopid, editedShopData) => {
  projectFirestore
    .collection("Malls")
    .doc(mallid)
    .update({
      shops: mallToUpdate.shops.map((shop) =>
        shop.id === +shopid ? editedShopData : shop
      ),
    })
    .then(() => console.log("succesfully added"))
    .catch((error) => console.log(error));
};

export const deleteShop = (mallid, shopsAfterDeleted) => {
  projectFirestore
    .collection("Malls")
    .doc(mallid)
    .update({ shops: shopsAfterDeleted })
    .then(() => console.log("deleted Shop"))
    .then((error) => console.log(error));
};

export const deleteMall = (mallId) => {
  projectFirestore
    .collection("Malls")
    .doc(mallId)
    .delete()
    .then(() => console.log("successfully deleted"))
    .then((error) => console.log(error));
};

export const deleteMallImageFromStorage = async (deletedMall) => {
  await projectStorage
    .ref()
    .child(deletedMall.image.id + deletedMall.image.imageName)
    .delete();

  await Promise.all(
    deletedMall.shops.map(
      async (shop) => await deleteShopImageFromStorage(shop.shopImages)
    )
  )
    .then(() => console.log("sucessfully delted Mall"))
    .catch((error) => console.log(error));
};

export const deleteShopImageFromStorage = async (shopImages) => {
  console.log(shopImages);
  await Promise.all(
    shopImages.map((image) =>
      projectStorage
        .ref()
        .child(image.id + image.imageName)
        .delete()
    )
  )
    .then(() => console.log("sucessfully deleted shops"))
    .then((error) => console.log(error));
};
