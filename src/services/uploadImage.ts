import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'lib/firebaseWebConfig';
import { CoverImage } from 'types/post';
import { acceptedImageTypes } from 'utils/validations';
import { v4 } from 'uuid';

export const uploadImage = async (image: FileList) => {
  if (acceptedImageTypes.includes(image[0].type)) {
    const imageId = v4();
    const storageRef = ref(storage, `coverImage/${imageId}`);
    const uploadedImage = await uploadBytes(storageRef, image[0]);
    const imageUrl = await getDownloadURL(uploadedImage.ref);

    return { name: uploadedImage.ref.name, url: imageUrl } as CoverImage;
  }

  return new Error('Tipo de arquivo não permitido');
};
