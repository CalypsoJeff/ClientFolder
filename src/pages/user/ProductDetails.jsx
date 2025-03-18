"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import NavBar from "../../components/user/NavBar";
import PageBreadcrumbs from "../../components/user/PageBreadcrumbs";
import { loadProductDetails } from "../../api/endpoints/products/user-products";
import {
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [currentStock, setCurrentStock] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product details...");
        const response = await loadProductDetails(id);
        const productData = response.data.product;
        setProduct(productData);

        // Set default selected size if available
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0].size);

          // Set available colors for this size
          setAvailableColors(productData.sizes[0].colors);

          // Set default selected color if available
          if (
            productData.sizes[0].colors &&
            productData.sizes[0].colors.length > 0
          ) {
            setSelectedColor(productData.sizes[0].colors[0].color);
            setCurrentStock(productData.sizes[0].colors[0].stock);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Update available colors when size changes
  useEffect(() => {
    if (!product || !selectedSize) return;

    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (sizeObj) {
      setAvailableColors(sizeObj.colors);

      // Reset selected color or select first available
      if (sizeObj.colors.length > 0) {
        if (!sizeObj.colors.some((c) => c.color === selectedColor)) {
          setSelectedColor(sizeObj.colors[0].color);
          setCurrentStock(sizeObj.colors[0].stock);
        } else {
          // Update stock for current color
          const colorObj = sizeObj.colors.find(
            (c) => c.color === selectedColor
          );
          setCurrentStock(colorObj.stock);
        }
      } else {
        setSelectedColor(null);
        setCurrentStock(0);
      }
    }
  }, [selectedSize, product]);

  // Update stock when color changes
  useEffect(() => {
    if (!product || !selectedSize || !selectedColor) return;

    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (sizeObj) {
      const colorObj = sizeObj.colors.find((c) => c.color === selectedColor);
      if (colorObj) {
        setCurrentStock(colorObj.stock);
      }
    }
  }, [selectedColor, selectedSize, product]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleNextImage = () => {
    if (product?.images?.length > 1) {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product?.images?.length > 1) {
      setActiveImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <PageBreadcrumbs />
        <div className="container mx-auto py-10 px-6 mt-28 min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-t-sky-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <PageBreadcrumbs />
        <div className="container mx-auto py-10 px-6 mt-28 min-h-[60vh] flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Error Loading Product
            </h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );

  return (
    <>
      <NavBar />
      <PageBreadcrumbs />

      <div className="container mx-auto py-10 px-4 sm:px-6 mt-28 mb-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image Section */}
            <div className="space-y-6">
              {/* Main Image with Navigation */}
              <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
                <img
                  src={
                    product.images?.[activeImageIndex] || "/fallback-image.jpg"
                  }
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images?.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                        activeImageIndex === index
                          ? "border-sky-600 shadow-md"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col h-full">
              {/* Basic Info */}
              <div className="mb-6">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Brand: {product.brand}
                  </p>

                  <div className="flex items-center mt-2 mb-3">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= (product.rating || 0) ? (
                            <FaStar />
                          ) : (
                            <FaRegStar />
                          )}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.reviews?.length || 0} reviews
                    </span>
                  </div>

                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-sky-600">
                      ₹{discountedPrice}
                    </span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ₹{product.price}
                        </span>
                        <span className="ml-2 text-green-600 font-medium">
                          {product.discount}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <h2 className="font-semibold text-lg mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-3">Select Size</h2>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((sizeObj) => (
                    <button
                      key={sizeObj._id}
                      onClick={() => setSelectedSize(sizeObj.size)}
                      className={`px-4 py-2 border rounded-md transition-all ${
                        selectedSize === sizeObj.size
                          ? "border-sky-600 bg-sky-50 text-sky-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {sizeObj.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-semibold text-lg mb-3">Select Color</h2>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((colorObj) => (
                      <button
                        key={colorObj._id}
                        onClick={() => setSelectedColor(colorObj.color)}
                        className={`relative px-4 py-2 border rounded-md transition-all ${
                          selectedColor === colorObj.color
                            ? "border-sky-600 bg-sky-50 text-sky-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: colorObj.color }}
                          ></div>
                          <span className="capitalize">{colorObj.color}</span>
                        </div>
                        {selectedColor === colorObj.color && (
                          <FaCheck className="absolute top-1 right-1 text-sky-600 text-xs" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Information */}
              <div className="mb-6">
                <div
                  className={`py-2 px-3 rounded-md ${
                    currentStock > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {currentStock > 0 ? (
                    <div className="flex items-center">
                      <FaCheck className="mr-2" />
                      <span>
                        {currentStock > 10
                          ? "In Stock"
                          : `Only ${currentStock} left in stock - order soon`}
                      </span>
                    </div>
                  ) : (
                    <span>Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-3">Specifications</h2>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Material:</span>
                    <span className="font-medium">{product.material}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Brand:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                </div>
              </div>

             

              {/* Add to Cart Section */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= currentStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-sky-600 hover:bg-sky-700 px-6 py-3 text-white text-base font-medium flex-1 flex items-center justify-center gap-2"
                    disabled={currentStock === 0}
                  >
                    <FaShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    className="border border-sky-600 bg-white text-sky-600 hover:bg-sky-50 px-6 py-3 text-base font-medium flex-1"
                    disabled={currentStock === 0}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
