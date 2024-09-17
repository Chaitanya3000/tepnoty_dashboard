import "./User_data_display.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function User_data_display() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/auth/get_details"
        );
        setUsers(response.data); // Set the user data
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error("Error fetching the users:", error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchUsers(); // Trigger the data fetch
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    return <div className="loading_screen"><h1>Loading...</h1></div>; // Display loading indicator while data is being fetched
  }

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/auth/delete_user/${userId}`);
      setUsers(users.filter(user => user.user_id !== userId)); // Update local state after deletion
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  };

  const handleUpdate = (userId) => {
    console.log("Update user with id:", userId);
    // Implement the update functionality or navigate to an update page
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
          const userId = tableMeta.rowData[5]; // Assuming `user_id` is at index 5
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <IconButton onClick={() => handleUpdate(userId)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(userId)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          );
        }
      }
    }
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
          <h3>100</h3> {/* You might want to replace this with actual data */}
        </div>
      </div>

      <MUIDataTable className="MUIDataTable"
        title={"User Data"}
        data={users} // Pass the users data to the DataTable
        columns={columns} // Pass the columns configuration
        options={{
          filterType: 'checkbox',
          responsive: 'vertical',
          rowsPerPage: 10,
          selectableRows: 'none'
        }}
      />
    </div>
  );
}

export default User_data_display;



// import "./User_data_display.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MUIDataTable from "mui-datatables";

// function User_data_display() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch users from the API when the component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/api/auth/get_details"
//         );
//         setUsers(response.data); // Set the user data
//         setLoading(false); // Data fetched, stop loading
//       } catch (error) {
//         console.error("Error fetching the users:", error);
//         setLoading(false); // In case of error, stop loading
//       }
//     };

//     fetchUsers(); // Trigger the data fetch
//   }, []); // Empty dependency array to run the effect only once

//   const columns = ["Name", "Company", "City", "State"];

//   const data = [
//     ["Joe James", "Test Corp", "Yonkers", "NY"],
//     ["John Walsh", "Test Corp", "Hartford", "CT"],
//     ["Bob Herm", "Test Corp", "Tampa", "FL"],
//     ["James Houston", "Test Corp", "Dallas", "TX"],
//   ];

//   return (
//     <>
//       <div className="data_display_background">
//         <div className="install_info">
//           <div className="install_data">
//             <h3>Number of downlodes</h3>
//             <h3>{users.length}</h3>
//           </div>
//           <div className="install_data">
//             <h3>Number of active users</h3>
//             <h3>100</h3>
//           </div>
//         </div>
//         <MUIDataTable className="MUIDataTable"
//           title={"Employee List"}
//           data={data}
//           columns={columns}
//         />
//         {/* <div>
//           <table class="data_table_container">
//             <thead>
//               <tr>
//                 <th>
//                   <h1>Phone Number</h1>
//                 </th>
//                 <th>
//                   <h1>Name</h1>
//                 </th>
//                 <th>
//                   <h1>Gender</h1>
//                 </th>
//                 <th>
//                   <h1>Date of Birth</h1>
//                 </th>
//                 <th>
//                   <h1>Username</h1>
//                 </th>
//                 <th>
//                   <h1>Email</h1>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.phoneNumber}</td>
//                   <td>{user.name}</td>
//                   <td>{user.gender}</td>
//                   <td>{new Date(user.dob).toLocaleDateString()}</td>{" "}
//                   <td>{user.user_id}</td>
//                   <td>{user.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table> */}
//         {/* </div> */}
//       </div>
//     </>
//   );
// }

// export default User_data_display;
