import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { performOCR } from './performOCR';

const pickDocument = async (setDocument, setExtractedText) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' }); // Allow image files
    console.log('DocumentPicker result:', result);

    if (!result.cancelled && result.uri) { // Check if the result is not cancelled and has a URI
      const imageUri = result.uri; // Use the URI directly for image files

      // Perform OCR on the selected image
      performOCR(imageUri, setExtractedText);

      // Set the document state with the image URI
      setDocument(imageUri);
    } else {
      console.error('No valid image selected.');
    }
  } catch (error) {
    console.error('Error picking document:', error);
  }
};

export { pickDocument };
