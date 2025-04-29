import React, { useState } from "react";
import "./App.css";
// …all the state, handlers, fetch/Stripe logic, and JSX for the DIY form…
import "./App.css";
import EasyTitheForm from "./EasyTitheForm";

function App() {
  return (
    <div className="app-wrapper" style={{ padding: "2rem" }}>
      <h1>Three-Day Camp Registration</h1>
      <p>
        Please complete the secure EasyTithe form below to register your
        camper(s) and submit payment.
      </p>

      <EasyTitheForm />
    </div>
  );
}

 export default App;
