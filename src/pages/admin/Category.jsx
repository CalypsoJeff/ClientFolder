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
import SideBar from "../../components/admin/SideBar";

import { Menu } from "lucide-react";
import {
  addCategory,
  editCategory,
  loadCategories,
  toggleCategory,
} from "../../api/endpoints/categories/admin-categories";

Modal.setAppElement("#root");

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await loadCategories();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire("Error!", "Failed to load categories.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open Modal
  const openModal = (category = null) => {
    if (category) {
      setFormData({ name: category.name, description: category.description });
      setSelectedCategory(category);
    } else {
      setFormData({ name: "", description: "" });
      setSelectedCategory(null);
    }
    setModalIsOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCategory(null);
  };

  // Handle Submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📝 Submitting Category:", formData);

      let response;
      if (selectedCategory) {
        response = await editCategory(selectedCategory._id, formData);
        Swal.fire("Updated!", "Category has been updated.", "success");
      } else {
        response = await addCategory(formData);
        Swal.fire("Added!", "Category has been added.", "success");
      }

      console.log("✅ Backend Response:", response.data); // Log backend response

      await fetchCategories(); // ✅ Ensure this runs to refresh data
      closeModal();
    } catch (error) {
      console.error(
        "❌ Error submitting category:",
        error.response?.data || error.message
      );
      Swal.fire("Error!", "Failed to save category.", "error");
    }
  };

  const handleToggleStatus = async (categoryId, currentStatus) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `This will ${
        currentStatus === "active" ? "deactivate" : "activate"
      } the category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${
        currentStatus === "active" ? "Deactivate" : "Activate"
      } it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await toggleCategory(categoryId);
          console.log("✅ Category Status Response:", response.data);

          Swal.fire(
            `${currentStatus === "active" ? "Deactivated" : "Activated"}!`,
            `Category has been ${
              currentStatus === "active" ? "deactivated" : "activated"
            }.`,
            "success"
          );

          // Refresh categories list after update
          await fetchCategories();
        } catch (error) {
          console.error("❌ Error updating category status:", error);
          Swal.fire("Error!", "Failed to update category status.", "error");
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
        {/* Header with Hamburger Menu */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button
            onClick={() => setIsSidebarOpen(true)} // ✅ Opens sidebar
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Category Management</h1>
        </header>
        <div className="p-5">
          <button
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => openModal()}
          >
            ➕ Add Category
          </button>

          {loading && <div className="text-center mt-4">Loading...</div>}

          {!loading && categories.length === 0 && (
            <div className="text-center text-gray-500 mt-6 text-lg">
              🚫 No categories available.
            </div>
          )}

          {!loading && categories.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                        onClick={() => openModal(category)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={`px-3 py-1 rounded hover:scale-105 transition-transform ${
                          category.status === "active"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-white`}
                        onClick={() =>
                          handleToggleStatus(category._id, category.status)
                        }
                      >
                        {category.status === "active" ? "🛑 Unlist" : "✅ List"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Category Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
        >
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory ? "Edit Category" : "Add Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {selectedCategory ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
