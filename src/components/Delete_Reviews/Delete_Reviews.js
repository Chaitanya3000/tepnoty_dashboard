import "./Delete_Reviews.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

function Delete_Reviews() {
  // Sample Data
  const sampleUsers = [
    {
      serialNo: 1,
      userName: "Alice Johnson",
      mainConsorn: "Login Issues",
      description: "Unable to log in using Facebook.",
    },
    {
      serialNo: 2,
      userName: "Bob Smith",
      mainConsorn: "Payment Failed",
      description: "Payment failed multiple times.",
    },
    {
      serialNo: 3,
      userName: "Charlie Brown",
      mainConsorn: "Slow Performance",
      description: "App performance is slow on my device.",
    },
  ];

  const [users, setUsers] = useState(sampleUsers); // Initialize with sample data
  const [loading, setLoading] = useState(true);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/get_reviews"); // Assuming reviews API
        setUsers(response.data); // Replace sample data with real data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // Define the columns for the MUI DataTable
  const columns = [
    {
      name: "serialNo",
      label: "Serial No",
    },
    {
      name: "userName",
      label: "User Name",
    },
    {
      name: "mainConsorn",
      label: "Main Concern",
    },
    {
      name: "description",
      label: "Description",
    },
  ];

  return (
    <div className="data_display_background">
      <MUIDataTable
        className="MUIDataTable"
        title={"Reviews"}
        data={users}
        columns={columns}
        options={{
          filterType: "checkbox",
          responsive: "vertical",
          rowsPerPage: 10,
          selectableRows: "none",
        }}
      />
    </div>
  );
}

export default Delete_Reviews;
