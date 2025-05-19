// components/ProductGallery.tsx
import React from 'react';

interface ProductGalleryProps {
  images: string[];
  selectedImage: string;
  onImageSelect: (image: string) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, selectedImage, onImageSelect }) => {
  return (
    <div className="product-gallery">
      {/* Thumbnail images */}
      <div className="thumbnails flex space-x-2 mb-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 object-cover cursor-pointer border-2 ${selectedImage === image ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => onImageSelect(image)}
          />
        ))}
      </div>
      {/* Main selected image */}
      <div className="main-image">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-96 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
