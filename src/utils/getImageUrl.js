import { projectStorage } from "../firebase/config";

export const getImageUrl = async (shopImages) => {
  console.log(shopImages);
  /*storing shops images in storage and getting url*/
  await Promise.all(
    shopImages.map((image) =>
      projectStorage.ref(image.id + image.image.name).put(image.image)
    )
  );

  const shopsurl = await Promise.all(
    shopImages.map((image) =>
      projectStorage.ref(image.id + image.image.name).getDownloadURL()
    )
  );

  return { shopsurl };
};

export const getAllImageUrl = async (shopDetails) => {
  /*storing shops images in storage and getting url*/
  console.log(shopDetails);
  await Promise.all(
    shopDetails.map((shop) =>
      Promise.all(
        shop.shopImages.map((image) =>
          projectStorage.ref(image.id + image.image.name).put(image.image)
        )
      )
    )
  );

  const shopsurl = await Promise.all(
    shopDetails.map((shop) =>
      Promise.all(
        shop.shopImages.map((image) =>
          projectStorage.ref(image.id + image.image.name).getDownloadURL()
        )
      )
    )
  );

  return { shopsurl };
};
