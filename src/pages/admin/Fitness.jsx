/* eslint-disable react/prop-types */
"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Menu } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import SideBar from "../../components/admin/SideBar";
import FitnessModal from "../../components/admin/FitnessModal";
// import {
//   addFitness,
//   deleteFitness,
//   editFitness,
//   loadFitness,
// } from "../../api/endpoints/fitness/admin-fitness";
import Modal from "react-modal";

// Fitness View Modal Component
const ViewFitnessModal = ({ isOpen, onClose, fitness }) => {
  if (!fitness) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-20 overflow-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-2xl font-bold mb-4">{fitness.name}</h2>
      <div className="space-y-3">
        <p>
          <strong>Description:</strong> {fitness.description}
        </p>
        <p>
          <strong>Category:</strong> {fitness.categories.join(", ")}
        </p>
        <p>
          <strong>Difficulty:</strong> {fitness.difficulty}
        </p>
        <p>
          <strong>Duration:</strong> {fitness.duration} mins
        </p>
        <p>
          <strong>Calories Burned:</strong> {fitness.caloriesBurned ?? "N/A"}
        </p>
        <p>
          <strong>Equipment:</strong>{" "}
          {fitness.equipment.length > 0 ? fitness.equipment.join(", ") : "None"}
        </p>
        <p>
          <strong>Target Muscles:</strong>{" "}
          {fitness.targetMuscles.length > 0
            ? fitness.targetMuscles.join(", ")
            : "Full Body"}
        </p>
      </div>
      <button
        className="mt-5 bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

const Fitness = () => {
  const [fitnessList, setFitnessList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedFitness, setSelectedFitness] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFitness = async () => {
    setLoading(true);
    try {
      const response = await loadFitness();
      setFitnessList(response.data.fitness);
    } catch (error) {
      console.error("Error fetching fitness activities:", error);
      Swal.fire("Error!", "Failed to load fitness activities.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitness();
  }, []);

  const openModal = (fitness) => {
    setSelectedFitness(fitness);
    setModalIsOpen(true);
  };

  const openViewModal = (fitness) => {
    setSelectedFitness(fitness);
    setViewModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFitness(null);
    setModalIsOpen(false);
  };

  const closeViewModal = () => {
    setSelectedFitness(null);
    setViewModalIsOpen(false);
  };

  const handleDeleteFitness = async (fitnessId) => {
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
          const response = await deleteFitness(fitnessId);
          Swal.fire("Deleted!", response.data.message, "success");
          await fetchFitness();
        } catch (error) {
          console.error("Error deleting fitness activity:", error);
          Swal.fire("Error!", "Failed to delete fitness activity.", "error");
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
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Fitness Management</h1>
        </header>

        <div className="p-5">
          <button
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => openModal()}
          >
            ➕ Add Fitness Activity
          </button>

          {loading && <div className="text-center mt-4">Loading...</div>}

          {!loading && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration (mins)</TableHead>
                  <TableHead>Calories Burned</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fitnessList.map((fitness) => (
                  <TableRow key={fitness._id}>
                    <TableCell>{fitness.name}</TableCell>
                    <TableCell>{fitness.categories.join(", ")}</TableCell>
                    <TableCell>{fitness.difficulty}</TableCell>
                    <TableCell>{fitness.duration}</TableCell>
                    <TableCell>
                      {fitness.caloriesBurned ? fitness.caloriesBurned : "N/A"}
                    </TableCell>
                    <TableCell>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                        onClick={() => openViewModal(fitness)}
                      >
                        👁 View
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                        onClick={() => openModal(fitness)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition-transform"
                        onClick={() => handleDeleteFitness(fitness._id)}
                      >
                        🗑️ Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <FitnessModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            fitness={selectedFitness}
          />

          <ViewFitnessModal
            isOpen={viewModalIsOpen}
            onClose={closeViewModal}
            fitness={selectedFitness}
          />
        </div>
      </div>
    </div>
  );
};

export default Fitness;
