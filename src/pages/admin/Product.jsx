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
// import {
//   addProduct,
//   editProduct,
//   deleteProduct,
//   loadProducts,
// } from "../../api/endpoints/admin-products";
// import { loadCategories } from "../../api/endpoints/admin-categories";
import SideBar from "../../components/admin/SideBar";
import ProductModal from "../../components/admin/ProductModal";

Modal.setAppElement("#root");

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await loadProducts();
      console.log("📂 Products Loaded:", response.data.products);
      setProducts(response.data.products || []);
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

  // Close Modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  // Handle Submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (selectedProduct) {
        await editProduct(selectedProduct._id, payload);
        Swal.fire("Updated!", "Product has been updated.", "success");
      } else {
        await addProduct(payload);
        Swal.fire("Added!", "Product has been added.", "success");
      }
      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error("❌ Error submitting product:", error);
      Swal.fire("Error!", "Failed to save product.", "error");
    }
  };

  // Handle Delete Product
  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will unlist the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Unlist it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId);
          Swal.fire("Deleted!", "Product has been unlisted.", "success");
          await fetchProducts();
        } catch (error) {
          console.error("❌ Error deleting product:", error);
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
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
              {/* <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                        onClick={() => openModal(product)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition-transform"
                        onClick={() => handleDelete(product._id)}
                      >
                        🗑️ Unlist
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          )}

          <ProductModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            product={selectedProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
