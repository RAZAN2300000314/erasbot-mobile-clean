// utils/imagePicker.ts

import { launchImageLibrary, Asset, ImageLibraryOptions } from 'react-native-image-picker';

/**
 * Opens the device's image library and lets the user select a single photo.
 *
 * @returns A Promise that resolves to an object containing the selected image's URI, fileName, and type,
 *          or null if the user cancels the picker.
 */
export const pickImage = async (): Promise<{
  uri: string;
  fileName?: string;
  type?: string;
} | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        resolve(null); // ✅ User cancelled
      } else if (response.errorCode) {
        reject(new Error(response.errorMessage || 'Image picker error'));
      } else if (response.assets && response.assets.length > 0) {
        const asset: Asset = response.assets[0];

        if (!asset.uri) {
          reject(new Error('Selected image has no URI'));
          return;
        }

        resolve({
          uri: asset.uri,
          fileName: asset.fileName,
          type: asset.type,
        });
      } else {
        reject(new Error('No image selected'));
      }
    });
  });
};
