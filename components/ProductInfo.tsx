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

      <ul className="space-y-1 text-sm mt-4 text-gray-600"> {/* Added text-gray-600 for better visibility */}
        <li>✔️ FREE Returns</li>
        <li>✔️ 15 days Returnable</li>
        <li>✔️ Free Delivery</li>
        <li>✔️ Fulfilled by Amazon</li>
        <li>✔️ Secure transaction</li>
      </ul>

    </div>
  );
};

export default ProductInfo;
