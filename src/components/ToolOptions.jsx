import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, RotateCw, Move, Edit3, Square } from "lucide-react";

const ToolOptions = ({
    onZoomIn,
    onZoomOut,
    onRotateCw,
    onRotateCcw,
    onToggleDrawingMode,
    onTogglePanMode,
    onToggleBoundingBoxMode,
    onToggleCommentMode,
    drawingMode,
    panMode,
    boundingBoxMode
}) => {
    return (
        <div className="w-20 bg-gray-200 p-2 space-y-4">
            <button onClick={onZoomIn} className="tool-button"><ZoomIn /></button>
            <button onClick={onZoomOut} className="tool-button"><ZoomOut /></button>
            <button onClick={onRotateCw} className="tool-button"><RotateCw /></button>
            <button onClick={onRotateCcw} className="tool-button"><RotateCcw /></button>
            <button onClick={onTogglePanMode} className={`tool-button ${panMode ? 'bg-blue-400' : ''}`}><Move /></button>
            <button onClick={onToggleDrawingMode} className={`tool-button ${drawingMode ? 'bg-green-400' : ''}`}><Edit3 /></button>
            <button onClick={onToggleBoundingBoxMode} className={`tool-button ${boundingBoxMode ? 'bg-red-400' : ''}`}><Square /></button>
        </div>
    );
};

export default ToolOptions;
