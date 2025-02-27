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
import SideBar from "../../components/admin/SideBar";
import {
  addTrek,
  deleteTrek,
  editTrek,
  loadTreks,
} from "../../api/endpoints/trekkings/admin-trekking";
import Modal from "react-modal";
import { Menu } from "lucide-react";
import TrekkingModal from "../../components/admin/TrekkingModal";

const ViewTrekkingModal = ({ isOpen, onClose, trekking }) => {
  if (!trekking) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto mt-20 overflow-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">{trekking.name}</h2>
          <div className="space-y-3">
            <p>
              <strong>Category:</strong> {trekking.category.join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {trekking.place},{" "}
              {trekking.state.join(", ")}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(trekking.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Duration:</strong> {trekking.trekDuration}
            </p>
            <p>
              <strong>Distance:</strong> {trekking.trekDistance} km
            </p>
            <p>
              <strong>Difficulty:</strong> {trekking.difficulty}
            </p>
            <p>
              <strong>Max Participants:</strong> {trekking.maxParticipants}
            </p>
            <p>
              <strong>Cost per Person:</strong> ₹{trekking.costPerPerson}
            </p>
            <p>
              <strong>Description:</strong> {trekking.description}
            </p>
          </div>
        </div>

        {/* Right Side - Trekking Image */}
        {trekking.image && (
          <div className="flex-1 flex justify-center items-center">
            <img
              src={trekking.image}
              alt={trekking.name}
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded-md block mx-auto"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

const Trekking = () => {
  const [trekkingList, setTrekkingList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrekking, setSelectedTrekking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedTrekView, setSelectedTrekView] = useState(null);

  const fetchTrekking = async () => {
    setLoading(true);
    try {
      const response = await loadTreks();
      console.log("📥 Fetched Trekking Data:", response.data); // ✅ Debugging log
      setTrekkingList(response.data.trekList || []); // ✅ Use 'trekList' instead of 'trekking'
    } catch (error) {
      console.error("❌ Error fetching trekking:", error);
      Swal.fire("Error!", "Failed to load trekking.", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrekking();
  }, []);

  const openModal = (trekking) => {
    setSelectedTrekking(trekking);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTrekking(null);
    setModalIsOpen(false);
  };
  const openViewModal = (trek) => {
    setSelectedTrekView(trek);
    setViewModalIsOpen(true);
  };

  const closeViewModal = () => {
    setSelectedTrekView(null);
    setViewModalIsOpen(false);
  };

  const handleDeleteTrekking = async (trekkingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTrek(trekkingId);
          Swal.fire("Deleted!", response.data.message, "success");
          await fetchTrekking();
        } catch (error) {
          console.error("Error deleting trekking:", error);
          Swal.fire("Error!", "Failed to delete trekking.", "error");
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "images") {
          // ✅ Ensure images are handled properly
          if (values[key] && values[key].length > 0) {
            Array.from(values[key]).forEach((file) =>
              formData.append("images", file)
            );
          }
        } else if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key])); // ✅ Convert arrays to JSON strings
        } else {
          formData.append(key, values[key] ?? ""); // ✅ Ensure no undefined values
        }
      });

      console.log("🚀 Final FormData Sent:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // ✅ Log all form data
      }

      if (selectedTrekking) {
        await editTrek(selectedTrekking._id, formData);
        Swal.fire("Updated!", "Trekking has been updated.", "success");
      } else {
        const response = await addTrek(formData);
        console.log("✅ Add Trek Response:", response.data);
        Swal.fire("Added!", "Trekking has been added.", "success");
      }

      await fetchTrekking(); // ✅ Refresh trekking list
      closeModal();
    } catch (error) {
      console.error("❌ Error submitting trekking:", error);
      Swal.fire("Error!", "Failed to save trekking.", "error");
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
          <h1 className="text-2xl font-bold">Trekking Management</h1>
        </header>
        <div className="p-5">
          <button
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => openModal()}
          >
            ➕ Add Trekking
          </button>

          {loading && <div className="text-center mt-4">Loading...</div>}

          {!loading && trekkingList.length === 0 && (
            <div className="text-center text-gray-500 mt-6 text-lg">
              🚫 No trekking events available.
            </div>
          )}

          {!loading && trekkingList.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Distance (km)</TableHead>
                  <TableHead>Cost (₹)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trekkingList.map((trek) => (
                  <TableRow key={trek._id}>
                    <TableCell>{trek.name}</TableCell>
                    <TableCell>{trek.category.join(", ")}</TableCell>
                    <TableCell>
                      {trek.place}, {trek.state.join(", ")}
                    </TableCell>
                    <TableCell>{trek.trekDistance} km</TableCell>
                    <TableCell>₹{trek.costPerPerson}</TableCell>
                    <TableCell>
                      {/* 👁 View Button */}
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                        onClick={() => openViewModal(trek)}
                      >
                        👁 View
                      </button>
                      {/* ✏ Edit Button */}
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                        onClick={() => openModal(trek)}
                      >
                        ✏️ Edit
                      </button>
                      {/* 🗑 Delete Button */}
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition-transform"
                        onClick={() => handleDeleteTrekking(trek._id)}
                      >
                        🗑️ Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <TrekkingModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            trekking={selectedTrekking}
          />
          <ViewTrekkingModal
            isOpen={viewModalIsOpen}
            onClose={closeViewModal}
            trekking={selectedTrekView}
          />
        </div>
      </div>
    </div>
  );
};
export default Trekking;
