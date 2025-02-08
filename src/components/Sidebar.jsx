import React from 'react';

const Sidebar = ({ images, setSelectedImage }) => {
    return (
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-black">Image Slideshow</h2>
        <div className="space-y-2">
            {images.length > 0 ? (
                images.map((image, index) => (
                    <div
                    key={index}
                    className="cursor-pointer border border-gray-300 p-1 rounded hover:bg-gray-300"
                    onClick={() => setSelectedImage(image)}
                    >
                    <img src={URL.createObjectURL(image)} alt={`Slide ${index + 1}`} className="h-20 w-full object-cover rounded" />
                    </div>
                ))
            ) : (
            <p className="text-gray-500">No images uploaded.</p>
            )}
        </div>
        </div>
    );
};

export default Sidebar;
