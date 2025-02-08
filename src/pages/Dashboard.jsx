import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CanvasArea from '../components/CanvasArea';
import ToolOptions from '../components/ToolOptions';
import ErrorModal from '../components/ErrorModal';
import { ZoomIn, ZoomOut, Crop, Ruler, RotateCcw, RotateCw, Move, Square } from "lucide-react";

const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [drawingMode, setDrawingMode] = useState(false);
    const [panMode, setPanMode] = useState(false);
    const [boundingBoxMode, setBoundingBoxMode] = useState(false);

    const handleImageUpload = (event) => {
        const newImages = Array.from(event.target.files);
        if (images.length + newImages.length > 10) {
            setError('You can only upload up to 10 images.');
            return;
        }
        setImages([...images, ...newImages]);
        if (!selectedImage) setSelectedImage(newImages[0]);
    };

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    const handleRotateCw = () => setRotation(prev => (prev + 90) % 360);
    const handleRotateCcw = () => setRotation(prev => (prev - 90 + 360) % 360);
    const toggleDrawingMode = () => {
        setDrawingMode(prev => !prev);
        setBoundingBoxMode(false);
        setPanMode(false);
    };
    const togglePanMode = () => {
        setPanMode(prev => !prev);
        setDrawingMode(false);
        setBoundingBoxMode(false);
    };
    const toggleBoundingBoxMode = () => {
        setBoundingBoxMode(prev => !prev);
        setDrawingMode(false);
        setPanMode(false);
    };

    return (
        <div className="flex h-screen">
            <Sidebar images={images} setSelectedImage={setSelectedImage} />
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center p-4 bg-white shadow">
                    <h1 className="text-2xl font-bold text-black">Image Analysis Dashboard</h1>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
                        Upload Images
                    </label>
                </div>
                <CanvasArea 
                    image={selectedImage} 
                    zoomLevel={zoomLevel} 
                    rotation={rotation} 
                    drawingMode={drawingMode} 
                    panMode={panMode} 
                    boundingBoxMode={boundingBoxMode} 
                />
            </div>
            <ToolOptions 
                onZoomIn={handleZoomIn} 
                onZoomOut={handleZoomOut} 
                onRotateCw={handleRotateCw} 
                onRotateCcw={handleRotateCcw} 
                onToggleDrawingMode={toggleDrawingMode} 
                onTogglePanMode={togglePanMode} 
                onToggleBoundingBoxMode={toggleBoundingBoxMode} 
                drawingMode={drawingMode} 
                panMode={panMode} 
                boundingBoxMode={boundingBoxMode} 
            />
            {error && <ErrorModal message={error} onClose={() => setError('')} />}
        </div>
    );
};

export default Dashboard;
