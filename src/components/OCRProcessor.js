import ocrService from '../services/ocrService';

const OCRProcessor = {
  processImage: async (file) => {
    try {
      const result = await ocrService.processImage(file);
      return result;
    } catch (error) {
      console.error('Error in OCR processing:', error);
      return 'OCR processing failed. Please try again.';
    }
  },
};

export default OCRProcessor;

// This component acts as a wrapper for the OCR service.
// It provides a method to process an image file using the OCR service.
// Error handling is implemented to catch and log any issues during OCR processing.
