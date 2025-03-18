/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import Modal from "react-modal";
import { Menu } from "lucide-react";

import SideBar from "../../components/admin/SideBar";
import ProductModal from "../../components/admin/ProductModal";
import { loadCategories } from "../../api/endpoints/categories/admin-categories";
import {
  addProduct,
  editProduct,
  loadProducts,
} from "../../api/endpoints/products/admin-products";

Modal.setAppElement("#root");

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
    brand: "",
    material: "",
    images: [],
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await loadProducts();
      console.log(response.data);
      console.log("📂 Products Loaded:", response.data.Products);

      if (response.data.Products.length === 0) {
        console.warn("⚠️ No products found in API response.");
      }

      setProducts(response.data.Products || []);
      console.log("✅ Updated Products State:", products); // Debugging state update
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      Swal.fire("Error!", "Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await loadCategories();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Open Modal
  const openModal = (product = null) => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        category: product.category?._id || "",
        brand: product.brand,
        material: product.material,
        images: product.images,
      });
      setSelectedProduct(product);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        discount: 0,
        category: "",
        brand: "",
        material: "",
        images: [],
      });
      setSelectedProduct(null);
    }
    setModalIsOpen(true);
  };
  // Open Modal to View Product Details
  const openViewModal = (product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };
  const closeViewModal = () => setViewModalOpen(false);

  // Close Modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          // Append images as an array
          formData.images.forEach((file) => {
            formDataToSend.append("images", file); // ✅ This matches multer field
          });
        } else if (Array.isArray(formData[key])) {
          formDataToSend.append(key, JSON.stringify(formData[key])); // ✅ Convert array to JSON
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log("📝 FormData Sent:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]); // Debugging
      }

      if (selectedProduct) {
        await editProduct(selectedProduct._id, formDataToSend);
        Swal.fire("Updated!", "Product has been updated.", "success");
      } else {
        await addProduct(formDataToSend);
        Swal.fire("Added!", "Product has been added.", "success");
      }

      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error("❌ Error submitting product:", error);
      Swal.fire("Error!", "Failed to save product.", "error");
    }
  };

  return (
    <div className="flex h-screen">
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Product Management</h1>
        </header>
        <div className="p-5">
          <button
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => openModal()}
          >
            ➕ Add Product
          </button>

          {loading && <div className="text-center mt-4">Loading...</div>}

          {!loading && products.length === 0 && (
            <div className="text-center text-gray-500 mt-6 text-lg">
              🚫 No products available.
            </div>
          )}

          {!loading && products.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        {product.category?.name
                          ? product.category.name
                          : "Uncategorized"}
                      </TableCell>
                      <TableCell>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                          onClick={() => openViewModal(product)}
                        >
                          👁️ View
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                          onClick={() => openModal(product)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition-transform"
                          onClick={() => console.log("Unlist", product._id)}
                        >
                          🗑️ Unlist
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500"
                    >
                      🚫 No products available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <ProductModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            product={selectedProduct}
            categories={categories}
          />
          {/* View Product Modal */}
          <Modal
            isOpen={viewModalOpen}
            onRequestClose={closeViewModal}
            contentLabel="View Product Details"
            className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            {selectedProduct && (
              <div className="space-y-4">
                <p>
                  <strong>Name:</strong> {selectedProduct.name}
                </p>
                <p>
                  <strong>Price:</strong> ₹{selectedProduct.price}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {selectedProduct.category?.name || "Uncategorized"}
                </p>
                <p>
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                {selectedProduct.images &&
                  selectedProduct.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md shadow"
                        />
                      ))}
                    </div>
                  )}
              </div>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
              onClick={closeViewModal}
            >
              Close
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Product;
