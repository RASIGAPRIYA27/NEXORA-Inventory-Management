
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  UserPlus,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UserModal from "@/components/UserModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

// Sample data for users
const sampleUsers = [
  { 
    id: 1, 
    name: "Rasiga Priya", 
    email: "rasiga@example.com", 
    role: "Admin", 
    avatar: "https://i.ibb.co/2744bmCR/download.jpg",
    active: true 
  },
  { 
    id: 2, 
    name: "Jane", 
    email: "jane@example.com", 
    role: "Manager", 
    avatar: "https://i.ibb.co/Kzx9Dd2N/download-1.jpg" ,
    active: true 
  },
  { 
    id: 3, 
    name: "Alex", 
    email: "alex33@example.com, 
    role: "Staff", 
    avatar: "https://i.ibb.co/20cFdkBw/Images-de-Avatar-Homme-Freepik.jpg",
    active: true 
  },
  { 
    id: 4, 
    name: "Sarah", 
    email: "sarah@example.com", 
    role: "Staff", 
    avatar: "https://i.ibb.co/Kzx0YVpr/Retrato-de-una-mujer-joven-y-bella.jpg",
    active: false 
  },
  { 
    id: 5, 
    name: "Michael Brown", 
    email: "michael@example.com", 
    role: "Manager", 
    avatar: "https://i.ibb.co/whq2Kvjg/m1.jpg",
    active: true 
  },
];

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  active: boolean;
  phone?: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="mr-2 h-5 w-5" /> Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "Admin" 
                            ? "bg-purple-100 text-purple-800" 
                            : user.role === "Manager" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center ${
                            user.active 
                              ? "text-green-600" 
                              : "text-gray-400"
                          }`}
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.active 
                            ? <><CheckCircle className="mr-1 h-4 w-4" /> Active</> 
                            : <><XCircle className="mr-1 h-4 w-4" /> Inactive</>
                          }
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClick(user)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteClick(user)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <UserModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddUser}
          mode="add"
        />
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <UserModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSave={handleEditUser}
          mode="edit"
          user={selectedUser}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && selectedUser && (
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDeleteUser}
          itemName={selectedUser.name}
        />
      )}
    </div>
  );
};

export default Users;
