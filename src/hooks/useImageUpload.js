import { useState } from 'react';

const useImageUpload = (maxImages = 10) => {
    const [images, setImages] = useState([]);

    const uploadImages = (files) => {
        const newImages = Array.from(files);
        if (images.length + newImages.length > maxImages) {
        throw new Error(`You can only upload up to ${maxImages} images.`);
        }
        setImages([...images, ...newImages]);
    };

    return { images, uploadImages };
};

export default useImageUpload;
