import "./App.css";
import About from "./Views/About";
import ClientContacts from "./Views/ClientContacts";
import Home from "./Views/Home";
import ClientInventories from "./Views/ClientInventories";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/">
            <Route index element={<Home/>}></Route>
            <Route path="about" element={<About/>}></Route>
            <Route path="clientcontacts" element={<ClientContacts/>}></Route>
            <Route path="clientinventories" element={<ClientInventories/>}></Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
