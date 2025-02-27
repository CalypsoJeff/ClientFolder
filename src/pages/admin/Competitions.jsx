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
import CompetitionModal from "../../components/admin/CompetitionModal";
import {
  addCompetition,
  deleteCompetition,
  editCompetition,
  loadCompetitions,
} from "../../api/endpoints/competitions/admin-competition";
import Modal from "react-modal";
import { Menu } from "lucide-react";

// Competition View Modal Component
const ViewCompetitionModal = ({ isOpen, onClose, competition }) => {
  if (!competition) return null; // Avoid rendering without data

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
          <h2 className="text-2xl font-bold mb-4">{competition.name}</h2>
          <div className="space-y-3">
            <p>
              <strong>Category:</strong> {competition.category.join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {competition.place},{" "}
              {competition.state.join(", ")}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(competition.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {competition.time}
            </p>
            <p>
              <strong>Duration:</strong> {competition.duration} hours
            </p>
            <p>
              <strong>Type:</strong> {competition.type.join(", ")}
            </p>
            <p>
              <strong>Slots Available:</strong> {competition.maxRegistrations}
            </p>
            <p>
              <strong>Cost:</strong> ₹{competition.cost}
            </p>
            <p>
              <strong>Status:</strong> {competition.status}
            </p>
            <p>
              <strong>Description:</strong> {competition.description}
            </p>
          </div>
        </div>

        {/* Right Side - Competition Image */}
        {competition.image && (
          <div className="flex-1 flex justify-center items-center">
            <img
              src={competition.image}
              alt={competition.name}
              className="max-w-full h-auto rounded-lg shadow-md"
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

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const response = await loadCompetitions();
      setCompetitions(response.data.competitions);
    } catch (error) {
      console.error("Error fetching competitions:", error);
      Swal.fire("Error!", "Failed to load competitions.", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompetitions();
  }, []);
  const openModal = (competition) => {
    setSelectedCompetition(competition);
    setModalIsOpen(true);
  };
  const openViewModal = (competition) => {
    setSelectedCompetition(competition);
    setViewModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedCompetition(null);
    setModalIsOpen(false);
  };
  const closeViewModal = () => {
    setSelectedCompetition(null);
    setViewModalIsOpen(false);
  };
  const handleDeleteCompetition = async (competitionId) => {
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
          const response = await deleteCompetition(competitionId);
          Swal.fire("Deleted!", response.data.message, "success");
          await fetchCompetitions(); // Refresh list after deletion
        } catch (error) {
          console.error("Error deleting competition:", error);
          Swal.fire("Error!", "Failed to delete competition.", "error");
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images") {
          if (values[key] && values[key].length > 0) {
            values[key].forEach((file) => formData.append("images", file));
          }
        } else if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key] ?? "");
        }
      });
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      if (selectedCompetition) {
        await editCompetition(selectedCompetition._id, formData);
        Swal.fire("Updated!", "Competition has been updated.", "success");
      } else {
        const response = await addCompetition(formData);
        console.log("Add competition response:", response.data);
        Swal.fire("Added!", "Competition has been added.", "success");
      }
      await fetchCompetitions();
      closeModal();
    } catch (error) {
      console.error("Error submitting competition:", error);
      Swal.fire("Error!", "Failed to save competition.", "error");
    }
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
          <h1 className="text-2xl font-bold">Competitions Management</h1>
        </header>
        <div className="p-5">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => openModal()}
          >
            ➕ Add Competition
          </button>

          {loading && <div className="text-center mt-4">Loading...</div>}

          {!loading && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Slots</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.length > 0 ? (
                  competitions.map((comp) => (
                    <TableRow key={comp._id}>
                      <TableCell>{comp.name}</TableCell>
                      <TableCell>{comp.category.join(", ")}</TableCell>
                      <TableCell>
                        {comp.place}, {comp.state.join(", ")}
                      </TableCell>
                      <TableCell>{comp.maxRegistrations}</TableCell>
                      <TableCell>₹{comp.cost}</TableCell>
                      <TableCell>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                          onClick={() => openViewModal(comp)}
                        >
                          👁 View
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:scale-105 transition-transform"
                          onClick={() => openModal(comp)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition-transform"
                          onClick={() => handleDeleteCompetition(comp._id)}
                        >
                          🗑️ Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="6"
                      className="text-center py-4 text-gray-500"
                    >
                      No competitions available. Add a new competition to get
                      started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <CompetitionModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            competition={selectedCompetition}
          />

          <ViewCompetitionModal
            isOpen={viewModalIsOpen}
            onClose={closeViewModal}
            competition={selectedCompetition}
          />
        </div>
      </div>
    </div>
  );
};

export default Competitions;
