import * as firebase from "firebase";

export const uploadImage = async (uri, nameImage, folder) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  let ref = firebase
    .storage()
    .ref()
    .child(`${folder}/${nameImage}`);

  await ref.put(blob);

  return await firebase
    .storage()
    .ref(`${folder}/${nameImage}`)
    .getDownloadURL()
    .then(resolve => {
      return resolve;
    })
    .catch(error => {
      console.log("Error");
    });
};
