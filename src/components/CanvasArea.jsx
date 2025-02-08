import React, { useRef, useState } from 'react';

const CanvasArea = ({ image, zoomLevel, rotation, drawingMode, boundingBoxMode, panMode }) => {
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
    const [boundingBoxes, setBoundingBoxes] = useState([]);
    const [currentBox, setCurrentBox] = useState(null);
    const [freehandPath, setFreehandPath] = useState([]);
    const [comments, setComments] = useState([]);
    const [isCommentToolActive, setIsCommentToolActive] = useState(false);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        if (boundingBoxMode) {
            setCurrentBox({ x: startX, y: startY, width: 0, height: 0 });
        } else if (drawingMode) {
            setFreehandPath([{ x: startX, y: startY }]);
        } else if (panMode) {
            setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
        }
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        if (boundingBoxMode && currentBox) {
            const width = currentX - currentBox.x;
            const height = currentY - currentBox.y;
            setCurrentBox({ ...currentBox, width, height });
        } else if (drawingMode) {
            setFreehandPath([...freehandPath, { x: currentX, y: currentY }]);
        } else if (panMode) {
            setCanvasOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            if (boundingBoxMode && currentBox) {
                setBoundingBoxes([...boundingBoxes, currentBox]);
                setCurrentBox(null);
            }
            setIsDragging(false);
        }
    };

    const handleClear = () => {
        setBoundingBoxes([]);
        setFreehandPath([]);
        setComments([]);
    };

    const canvasStyle = {
        transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
        cursor: drawingMode ? 'crosshair' : panMode ? 'grab' : 'default',
        transition: panMode ? 'none' : 'transform 0.2s ease',
    };

    const handleAddComment = (e) => {
        if (!isCommentToolActive) return;
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const comment = prompt('Enter your comment:');
        if (comment) {
            setComments([...comments, { x, y, comment }]);
        }
    };

    const toggleCommentTool = () => {
        setIsCommentToolActive(!isCommentToolActive);
    };

    return (
        <div
            className="relative w-full h-full bg-gray-100 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
            onClick={handleAddComment}
        >
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ ...canvasStyle, transformOrigin: 'center', position: 'absolute' }}
            />
            {image && (
                <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="absolute w-full h-full object-contain pointer-events-none"
                    style={canvasStyle}
                />
            )}
            {boundingBoxes.map((box, index) => (
                <div
                    key={index}
                    className="absolute border border-blue-500 bg-opacity-20"
                    style={{
                        left: `${box.x}px`,
                        top: `${box.y}px`,
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                    }}
                />
            ))}
            <svg className="absolute w-full h-full pointer-events-none">
                <polyline
                    points={freehandPath.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                />
            </svg>
            {currentBox && (
                <div
                    className="absolute border border-red-500 bg-red-200 bg-opacity-20"
                    style={{
                        left: `${currentBox.x}px`,
                        top: `${currentBox.y}px`,
                        width: `${currentBox.width}px`,
                        height: `${currentBox.height}px`,
                    }}
                />
            )}

            {comments.map((comment, index) => (
                <div
                    key={index}
                    className="absolute text-white bg-black bg-opacity-70 p-1 rounded"
                    style={{
                        left: `${comment.x}px`,
                        top: `${comment.y}px`,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    {comment.comment}
                </div>
            ))}

            <button
                onClick={handleClear}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded"
            >
                Clear
            </button>

            <button
                onClick={toggleCommentTool}
                className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded"
            >
                {isCommentToolActive ? 'Disable Comment Tool' : 'Enable Comment Tool'}
            </button>
        </div>
    );
};

export default CanvasArea;
