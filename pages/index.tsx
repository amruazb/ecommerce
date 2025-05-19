import React, { useState, useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";

// Define the type for a single variant
interface Variant {
  id: number;
  label: string;
  price: number;
}

// Define the type for the product
interface Product {
  name: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  variants: Variant[];
  images: string[];
}

const productData: Product = {
  name: "HP Victus 15.6 i5 Gaming Laptop",
  description: "15.6\" FHD 1920x1080 144Hz, Intel Core i5-12450H, NVIDIA GeForce RTX 3050, Backlit KB, Touchpad, SD Card Reader (UPGRADE). Visit the HP Store.",
  rating: 4.0,
  reviews: 285,
  badge: "Aamir's Choice",
  variants: [
    { id: 1, label: "16GB RAM | 1TB SSD", price: 2378 },
    { id: 2, label: "32GB RAM | 1TB SSD", price: 2435 },
    { id: 3, label: "32GB RAM | 2TB SSD", price: 2610 },
  ],
  images: [
    "/images/victus1.jpg",
    "/images/victus2.jpg",
    "/images/victus3.jpg",
    "/images/victus4.jpg",
  ],
};

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(productData.variants[0]);
  const [cartCount, setCartCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load cartCount and isFavorite from localStorage
  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(JSON.parse(storedCartCount));
    }
    const storedIsFavorite = localStorage.getItem("isFavorite");
    if (storedIsFavorite) {
      setIsFavorite(JSON.parse(storedIsFavorite));
    }
  }, []);

  // Save cartCount to localStorage
  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cartCount]);

  // Save isFavorite to localStorage
  useEffect(() => {
    localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
  }, [isFavorite]);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
    alert(`${selectedVariant.label} added to cart!`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(prevFavorite => !prevFavorite);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "/") alert("Search triggered");
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === "c") alert("Go to Cart");
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === "h") alert("Go to Home");
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === "o") alert("Go to Orders");
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === "k") handleAddToCart();
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === "z") alert("Toggle Shortcuts Menu");
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [selectedVariant, cartCount, isFavorite]);

  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HP Victus Store</h1>
        <div>Cart: {cartCount}</div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery
          images={productData.images}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
        />
        <ProductInfo
          product={productData}
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
          onAddToCart={handleAddToCart}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          cartCount={cartCount}
        />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} HP Victus Store. All rights reserved.</p>
      </footer>
    </div>
  );
}