/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { loadProducts } from "../../api/endpoints/products/user-products";

const ProductCard = ({ product }) => (
  <div className="flex flex-col rounded-xl overflow-hidden bg-white shadow-lg w-[260px] hover:shadow-xl transition-shadow duration-300">
    <div className="h-[200px] overflow-hidden">
      <img
        src={product.images?.[0] || "/placeholder.svg"}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-display font-bold text-gray-900 text-sm">
          {product.name}
        </h3>
        <span className="text-orca-600 font-semibold text-sm">
          ${product.price}
        </span>
      </div>
      <p className="text-xs text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <button className="mt-3 w-full py-2 px-3 bg-orca-600 hover:bg-orca-700 text-white transition-colors text-xs font-medium rounded-md">
        View Details
      </button>
    </div>
  </div>
);

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await loadProducts();
        if (response?.data?.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-lg font-medium text-gray-700">Loading products...</p>
      </section>
    );
  }
  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-lg font-medium text-red-600">Error: {error}</p>
      </section>
    );
  }
  const limitedProducts = products.slice(0, 4);

  // Create an array of product cards for the slider
  const productCards = limitedProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-orca-100 text-orca-800 text-xs font-medium tracking-wide">
            Featured Products
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Discover Our Product Line
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our innovative products designed with precision and care
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <InfiniteSlider
            items={productCards}
            direction="left"
            speed="normal"
            pauseOnHover={true}
            className="py-4"
          />
        </div>

        <div className="text-center mt-10">
          <a
            href="#shop"
            className="inline-flex items-center justify-center rounded-md bg-orca-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orca-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orca-500"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
