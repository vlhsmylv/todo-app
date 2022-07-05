// ********** Dependencies **********
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ********** Routes **********
import Index from "./routes/Index";

// ********** Styles **********
import "./css/reset.css";
import "./css/app.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Index />}></Route>
    </Routes>
  </BrowserRouter>
);