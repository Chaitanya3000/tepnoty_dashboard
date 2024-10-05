import "./User_data_display.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function User_data_display() {
  // Sample Data
  const sampleUsers = [
    {
      user_id: "user001",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "123-456-7890",
      gender: "Female",
      dob: "1990-01-01",
    },
    {
      user_id: "user002",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phoneNumber: "987-654-3210",
      gender: "Male",
      dob: "1985-05-05",
    },
    {
      user_id: "user003",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phoneNumber: "555-444-3333",
      gender: "Male",
      dob: "2000-09-15",
    },
    
  ];

  const [users, setUsers] = useState(sampleUsers); // Initialize with sample data
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // Dialog open state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
  });

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/get_details");
        setUsers(response.data); // Replace sample data with real data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Open dialog for editing
  const handleUpdate = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      gender: user.gender || "",
      dob: new Date(user.dob).toISOString().substring(0, 10), // Format to YYYY-MM-DD for the date input
    });
    setOpen(true); // Open the dialog
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  // Save the updates (this is just a sample, you can integrate with an API)
  const handleSave = async () => {
    console.log("Updated user:", formData);
    // Update the backend API (you can replace this with actual API request)
    try {
      // Sample API call for updating user details
      // await axios.put(`http://localhost:3001/api/auth/update_user/${selectedUser.user_id}`, formData);
      
      // Update the local state after the form is submitted
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === selectedUser.user_id ? { ...user, ...formData } : user
        )
      );
      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/auth/delete_user/${userId}`);
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  };

  // Define the columns for the MUI DataTable
  const columns = [
    {
      name: "phoneNumber",
      label: "Phone Number",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "gender",
      label: "Gender",
    },
    {
      name: "dob",
      label: "Date of Birth",
      options: {
        customBodyRender: (value) => new Date(value).toLocaleDateString(),
      },
    },
    {
      name: "user_id",
      label: "Username",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[4]; // Assuming `user_id` is at index 4
          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <IconButton onClick={() => handleUpdate(userId)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(userId)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="data_display_background">
      <div className="install_info">
        <div className="install_data">
          <h3>Number of downloads</h3>
          <h3>{users.length}</h3>
        </div>
        <div className="install_data">
          <h3>Number of active users</h3>
          <h3>100</h3> {/* Sample data */}
        </div>
      </div>

      <MUIDataTable
        className="MUIDataTable"
        title={"User Data"}
        data={users}
        columns={columns}
        options={{
          filterType: "checkbox",
          responsive: "vertical",
          rowsPerPage: 10,
          selectableRows: "none",
        }}
      />

      {/* Popup form for editing user data */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default User_data_display;
