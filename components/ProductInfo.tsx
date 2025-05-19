// components/ProductInfo.tsx
import React from 'react';

interface Variant {
  id: number;
  label: string;
  price: number;
}

interface ProductInfoProps {
  product: {
    name: string;
    description: string;
    rating: number;
    reviews: number;
    badge?: string;
    variants: Variant[];
  };
  selectedVariant: Variant;
  onVariantChange: (variant: Variant) => void;
  onAddToCart: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  cartCount: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedVariant,
  onVariantChange,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  cartCount
}) => {
  return (
    <div className="product-info p-4">
      {product.badge && (
        <span className="inline-block px-2 py-1 bg-yellow-400 text-black font-semibold text-xs rounded mb-2"> {/* Updated mb-2 for spacing below badge */}
          {product.badge}
        </span>
      )}
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <div className="flex items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.75.75 0 011.04 0l2.529 2.438 3.532.513a.75.75 0 01.416 1.279l-2.557 2.493.603 3.513a.75.75 0 01-1.089.791L12 13.348l-3.152 1.657a.75.75 0 01-1.089-.79l.602-3.514L5.8 7.73a.75.75 0 01.416-1.28l3.533-.512L11.48 3.5z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600">({product.reviews} ratings)</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{product.description}</p>

      <div className="variants mb-4">
        <h3 className="text-lg font-semibold mb-2">Variants:</h3>
        <div className="flex flex-wrap gap-2"> {/* Added a wrapper for better spacing */}
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant)}
              className={`px-3 py-2 border rounded text-sm transition-all duration-150 ${
                selectedVariant.id === variant.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      <div className="price text-2xl font-bold mb-4">${selectedVariant.price}</div>

      <div className="actions flex items-center space-x-4">
        <button
          onClick={onAddToCart}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200"
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={onToggleFavorite}
          className={`px-4 py-2 rounded border transition-all duration-200 ${
            isFavorite ? "bg-red-500 text-white border-red-500 hover:bg-red-600" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>
      </div>

      {/* Product Benefits/Features */}
      <div className="mt-6 text-sm text-gray-600 space-y-2">
        <p>✓ FREE Returns</p>
        <p>✓ Secure transaction</p>
        <p>✓ Ships from Amazon</p>
        <p>✓ Sold by HP</p>
      </div>

      {/* Collapsible Product Details */}
      <details className="mt-4">
        <summary className="font-semibold cursor-pointer text-blue-600 hover:underline">Product details</summary>
        <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
          <p><strong>Processor:</strong> Intel Core i5-12450H</p>
          <p><strong>Graphics:</strong> NVIDIA GeForce RTX 3050 Laptop GPU</p>
          <p><strong>Display:</strong> 15.6-inch, FHD (1920 x 1080), 144 Hz, IPS</p>
          <p><strong>Keyboard:</strong> Full-size, backlit, mica silver keyboard with numeric keypad</p>
          <p><strong>Audio:</strong> Audio by B&O; Dual speakers; HP Audio Boost</p>
          <p><strong>Webcam:</strong> HP Wide Vision 720p HD camera with temporal noise reduction</p>
          <p><strong>Ports:</strong> 1 SuperSpeed USB Type-C® 5Gbps signaling rate (DisplayPort™ 1.4, HP Sleep and Charge); 1 SuperSpeed USB Type-A 5Gbps signaling rate (HP Sleep and Charge); 1 SuperSpeed USB Type-A 5Gbps signaling rate; 1 HDMI 2.1; 1 RJ-45; 1 AC smart pin; 1 headphone/microphone combo</p>
          <p><strong>Wireless:</strong> Realtek Wi-Fi 6 (2x2) and Bluetooth® 5.3 wireless card</p>
          <p><strong>Battery:</strong> 4-cell, 70 Wh Li-ion polymer</p>
          <p><strong>Weight:</strong> Starting at 2.29 kg</p>
          <p><strong>Warranty:</strong> 1-year limited warranty</p>
          <p className="mt-2 italic">More details available on the official HP website or by contacting support.</p>
        </div>
      </details>

    </div>
  );
};

export default ProductInfo;
