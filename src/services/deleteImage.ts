import { deleteObject, ref } from 'firebase/storage';
import { storage } from 'lib/firebaseWebConfig';

export const deleteImage = async (url: string) => {
  const imageToDelete = ref(storage, url);
  deleteObject(imageToDelete)
    .then(() => {
      return;
    })
    .catch(() => {
      throw new Error('Failed to update post');
    });
};
