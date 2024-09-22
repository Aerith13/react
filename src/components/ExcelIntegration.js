// This file uses the Office.js library for Excel integration
const ExcelIntegration = {
  postToSheet: async (text) => {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const range = sheet.getRange("A1");
        range.values = [[text]];
        await context.sync();
      });
      console.log('Data posted to Excel successfully');
    } catch (error) {
      console.error('Error posting to Excel:', error);
      throw error;
    }
  },
};

export default ExcelIntegration;

// This component handles the integration with Excel using the Office.js library.
// It provides a method to post the OCR result to the active worksheet in Excel.
// Error handling is implemented to catch and log any issues during the Excel operation.
