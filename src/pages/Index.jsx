import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload, FileText, Send } from "lucide-react";
import FileUpload from '../components/FileUpload';
import OCRProcessor from '../components/OCRProcessor';
import ExcelIntegration from '../components/ExcelIntegration';

const Index = () => {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    setOcrResult('');
    setError(null);
  };

  const processOCR = async () => {
    if (file) {
      setIsProcessing(true);
      setError(null);
      try {
        const result = await OCRProcessor.processImage(file);
        setOcrResult(result);
      } catch (error) {
        console.error('OCR processing error:', error);
        setError('OCR processing failed. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const postToExcel = () => {
    if (ocrResult) {
      try {
        ExcelIntegration.postToSheet(ocrResult);
      } catch (error) {
        console.error('Error posting to Excel:', error);
        setError('Failed to post data to Excel. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <Card className="w-full max-w-lg p-6 space-y-6 shadow-xl bg-white">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Test Page</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        {file && (
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4" />
              File uploaded: {file.name}
            </p>
            {file.type.startsWith('image/') && (
              <div className="mt-2 max-w-full overflow-hidden rounded-lg border-2 border-indigo-200">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Uploaded file" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <Button 
              onClick={processOCR} 
              disabled={isProcessing} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
            >
              {isProcessing ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Process OCR
                </>
              )}
            </Button>
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-600">Error</AlertTitle>
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}
        {ocrResult && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-indigo-700">OCR Result:</h2>
            <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-800 break-words">{ocrResult}</p>
            </div>
            <Button 
              onClick={postToExcel} 
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
            >
              <Send className="mr-2 h-4 w-4" />
              Post to Excel
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;

// This is the main page component for the Test Page.
// It manages the state for file upload, OCR processing, and Excel integration.
// The component provides a user interface for uploading files, processing OCR, and posting results to Excel.
// Error handling and loading states are implemented for a smooth user experience.
// The design has been enhanced with a professional color scheme and improved layout.
