import './sass/Global.scss';
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../src/components/home/HomePage';
import Login from '../src/components/login/LoginPage';
import Register from '../src/components/register/RegisterPage';
import Dashboard from "../src/components/dashboard/DashboardPage";
import Profile from "../src/components/profile/ProfilePage";
import Profiles from "./components/profiles/ProfilesPage";
import ProfileDetails from "./components/profiles/ProfileDetailsPage";
import EditPost from './components/profile/EditPost';
import UpdateMedia from "./components/profile/UpdateMedia";
import PostDetails from "./components/posts/PostDetailsPage";

function App() {
  return (

    <AuthProvider>
      <Router>
        <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/my-profile" element={<Profile />}></Route>
            <Route path="/posts/:id" element={<PostDetails />}></Route>
            <Route path="/profiles"element={<Profiles />}></Route>
            <Route path="/profiles/:name" element={<ProfileDetails />}></Route>
            <Route path="/edit-post/:id" element={<EditPost />}></Route>
            <Route path="/update-media" element={<UpdateMedia />}></Route>
          </Routes>
        <Footer />
        </Router>
      </AuthProvider>

  );
}

export default App;
