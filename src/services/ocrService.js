import axios from 'axios';

// OCR.space API endpoint
const OCR_API_ENDPOINT = 'https://api.ocr.space/parse/image';
// Replace 'YOUR_OCR_SPACE_API_KEY' with your actual API key from OCR.space
const API_KEY = import.meta.env.VITE_OCR_API_KEY;

const ocrService = {
  processImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', API_KEY);
      formData.append('language', 'eng');

      const response = await axios.post(OCR_API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.ParsedResults) {
        return response.data.ParsedResults[0].ParsedText;
      } else {
        throw new Error('OCR processing failed: No parsed results');
      }
    } catch (error) {
      console.error('Error processing OCR:', error);
      if (error.response) {
        throw new Error(`OCR processing failed: ${error.response.data.ErrorMessage || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('OCR processing failed: No response from server');
      } else {
        throw new Error(`OCR processing failed: ${error.message}`);
      }
    }
  },
};

export default ocrService;

// This file contains the OCR service that interacts with the OCR.space API.
// It handles sending image files for OCR processing and returns the parsed text.
// Error handling is implemented to provide meaningful error messages.
