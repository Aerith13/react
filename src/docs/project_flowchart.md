# Project Flowchart

```mermaid
graph TD
    A[User] -->|Uploads Image| B[FileUpload Component]
    B -->|Passes File| C[Index Component]
    C -->|Sends File| D[OCRProcessor]
    D -->|Processes Image| E[OCR Service]
    E -->|Returns Text| D
    D -->|Returns Result| C
    C -->|Displays Result| F[UI Display]
    C -->|User Initiates| G[Excel Integration]
    G -->|Posts Data| H[Excel Worksheet]

    subgraph "Frontend Components"
    B
    C
    F
    end

    subgraph "Processing"
    D
    E
    end

    subgraph "Integration"
    G
    H
    end
```

## Flowchart Explanation

1. **User**: Initiates the process by uploading an image.
2. **FileUpload Component**: Handles the file upload interface.
3. **Index Component**: Main component that orchestrates the process.
4. **OCRProcessor**: Manages the OCR processing logic.
5. **OCR Service**: External service that performs the actual OCR.
6. **UI Display**: Shows the OCR result to the user.
7. **Excel Integration**: Handles posting data to Excel.
8. **Excel Worksheet**: The final destination for the processed data.

This flowchart illustrates the main components and data flow in the OCR and Excel integration project.