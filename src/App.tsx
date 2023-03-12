import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
//react-router-dom
import {Main} from "./main/main"
import {Login} from "./pages/login"
import {Navbar} from "./components/navbar"
import {CreatePost} from "./pages/create-post/create_post";
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element ={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
