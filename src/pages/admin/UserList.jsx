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
import { Menu } from "lucide-react";
// Import your API endpoints
// import { blockUser, unblockUser, loadUsers } from "../../api/endpoints/admin-users";
import SideBar from "../../components/admin/SideBar";
import { userList } from "../../api/endpoints/users/admin-users";

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", isBlocked: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", isBlocked: true },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      isBlocked: false,
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      isBlocked: false,
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userList();
      console.log("📂 Users Loaded:", response.data.users);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      Swal.fire("Error!", "Failed to load users.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlockUser = async (user) => {
    const newStatus = !user.isBlocked; // Toggle the current status
    const actionText = newStatus ? "Block" : "Unblock";

    Swal.fire({
      title: `Are you sure you want to ${actionText} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actionText}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Unified API call to toggle block/unblock
          await toggleUserBlockStatus(user._id, newStatus);
          Swal.fire(
            `${actionText}ed!`,
            `User has been ${actionText.toLowerCase()}ed.`,
            "success"
          );

          // Update the state instead of fetching all users again
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === user._id ? { ...u, isBlocked: newStatus } : u
            )
          );
        } catch (error) {
          console.error(`❌ Error toggling user block:`, error);
          Swal.fire("Error!", "Failed to update user status.", "error");
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
          <h1 className="text-2xl font-bold">User Management</h1>
        </header>
        <div className="p-5">
          {loading && <div className="text-center mt-4">Loading...</div>}

          {!loading && users.length === 0 && (
            <div className="text-center text-gray-500 mt-6 text-lg">
              🚫 No users available.
            </div>
          )}

          {!loading && users.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <label className="flex items-center cursor-pointer relative">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={!user.isBlocked}
                          onChange={() => toggleBlockUser(user)}
                        />
                        <span
                          className={`block w-10 h-6 rounded-full transition ${
                            user.isBlocked ? "bg-gray-300" : "bg-green-500"
                          }`}
                        ></span>
                        <span
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            user.isBlocked ? "" : "translate-x-4"
                          }`}
                        ></span>
                      </label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
