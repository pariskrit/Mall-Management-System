import { useEffect, useState } from "react";
import { projectStorage, projectFirestore } from "./config";

const useStorage = (file) => {
  const { title, address, image, imageName } = file;

  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(image.name);
    const collectionRef = projectFirestore.collection("Malls");
    storageRef.put(image).on(
      "state_changed",
      (snap) => {},
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        collectionRef.add({ title, address, url, imageName });
        setUrl(url);
      }
    );
  }, [file, address, imageName, image, title]);
  return { error, url };
};

export default useStorage;
