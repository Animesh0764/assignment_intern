# Image Analysis Tool  

An interactive image analysis tool built with React for doctors to upload and analyze up to 10 images (e.g., X-rays, MRI scans). This tool offers a rich set of features, including annotations, freehand drawing, bounding boxes, measurements, image adjustments, and more.  

## Features  
- **Image Upload & Management**: Upload and manage up to 10 medical images.  
- **Canvas Area**: View and interact with images on a customizable canvas.  
- **Drawing & Annotation Tools**:  
    - Bounding boxes  
    - Freehand drawing  
    - Annotations and comments  
    - **Image Adjustments**:  
    - Zoom & Pan 
    - Rotate & Flip  
- **Comparison Mode**: Compare two images side by side.  
- **Export**: Save the analysis with annotations in a downloadable format.  

## Tech Stack  
- **Frontend**: React (Vite-based)  
- **State Management**: React Hooks  
- **Canvas Manipulation**: Native HTML5 Canvas API  
- **Styling**: CSS Modules / Styled Components  


### Key Components  
- **CanvasArea**: The core component for rendering and manipulating images.  
- **Toolbar**: Provides tools for drawing, annotations, and image adjustments.  
- **ImageSlider**: Allows navigation and selection of uploaded images.  

## Installation  
1. Clone the repository:  
    ```sh
    git clone https://github.com/yourusername/image-analysis-tool.git
    cd image-analysis-tool

2. Install dependencies:

    ```sh
    npm install

3. Start the development server:

    ```sh
    npm run dev

# Usage
    Upload medical images using the image upload panel.
    Use the toolbar to draw, annotate, and adjust the images as needed.
    Export your analysis when complete.

# Future Improvements
- **User Authentication**: Implement user authentication to save and retrieve analysis data.
- **Image Segmentation**: Add image segmentation tools for more advanced analysis.
- **Export Changed Image**: Allow users to export images with annotations and adjustments.