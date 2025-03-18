import { useEffect, useState } from "react";
import SpotlightCard from "../../components/ui/SpotlightCard";
import { loadShopProducts } from "../../api/endpoints/products/user-products";
import NavBar from "../../components/user/NavBar";
import PageBreadcrumbs from "../../components/user/PageBreadcrumbs";
import { Link } from "react-router";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await loadShopProducts();
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

  return (
    <div className="w-full px-6 py-12">
      <NavBar />
      <PageBreadcrumbs/>
      <h1 className="text-4xl font-bold text-white text-center mb-10 pt-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <SpotlightCard
            key={product._id}
            className="custom-spotlight-card"
            spotlightColor="rgba(255, 255, 255, 0.25)"
          >
            <div className="flex flex-col w-full h-full">
              {/* Product Image */}
              <img
                src={product.images?.[0] || "/fallback-image.jpg"}
                alt={product.name}
                className="w-full h-1/2 object-cover rounded-t-3xl" // Full width, half height
              />

              {/* Product Details */}
              <div className="p-4 flex flex-col items-center flex-grow">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {product.name}
                </h2>

                <p className="text-lg text-gray-300">
                  <span className="text-black font-bold">₹{product.price}</span>
                  {product.discount > 0 && (
                    <span className="ml-2 text-red-400 text-sm">
                      ({product.discount}% OFF)
                    </span>
                  )}
                </p>

                {/* <p className="text-sm text-black-400 text-center mt-2">
                  {product.description}
                </p> */}

                 {/* View Details Button with Link */}
                 <Link to={`/product/${product._id}`}>
                  <button className="mt-4 px-5 py-2 bg-orca-600 hover:bg-orca-700 text-white rounded-md transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}

export default Products;
