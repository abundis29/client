import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { SideBox, Example } from "@v2";
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SideBox msg="prop message" className="right" />
        <Example />
      </header>
    </div>
  );
};
export default App;
