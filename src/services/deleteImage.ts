import { deleteObject, ref } from 'firebase/storage';
import { storage } from 'lib/firebaseWebConfig';

export const deleteImage = async (coverImageName: string) => {
  const imageToDelete = ref(storage, `coverImage/${coverImageName}`);
  deleteObject(imageToDelete)
    .then(() => {
      return;
    })
    .catch(() => {
      throw new Error('Failed to update post');
    });
};
