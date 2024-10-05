import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login_component/Login";
import Dashboard_nav from "./components/Dashboard_nav/Dashboard_nav";
import User_data_display from "./components/User_data_display/User_data_display";
import Post from "./components/Post/Post";
import Reviews from "./components/Reviews/Reviews";
import Delete_Reviews from "./components/Delete_Reviews/Delete_Reviews";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard_nav" element={<Dashboard_nav />}>
            <Route index element={<User_data_display />} />
            <Route path="User_data_display" element={<User_data_display />} />
            <Route path="post" element={<Post />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="delete_reviews" element={<Delete_Reviews />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
