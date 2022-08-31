import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import Task from "./pages/Task";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";

// constext hook
import useAuthContext from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  
  return (
    <BrowserRouter>    
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to="/goals" />}
          />
          <Route 
            path="/auth/login"
            element={!user ? <Login />: <Navigate to="/goals" />}
          />
          <Route 
            path="/auth/signup"
            element={!user ? <Signup />: <Navigate to="/goals" />}
          />
          <Route 
            path="/goals"
            element={user ? <Tasks /> : <Navigate to="/auth/login" />}
          />
          <Route 
            path="/goals/add"
            element={user ? <Add /> : <Navigate to="/auth/login" />}
          />
          <Route 
            path="/goals/:id"
            element={user ? <Task /> : <Navigate to="/auth/login" />}
          />
          <Route 
            path="/goals/:id/edit"
            element={user ? <Edit /> : <Navigate to="/auth/login" />}
          />
          <Route 
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/auth/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
