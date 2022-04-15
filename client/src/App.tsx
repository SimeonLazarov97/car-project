import React from "react";
import { AddCar } from "./pages/AddCar";
import { ListCars } from "./pages/ListCars";
import { Container } from "react-bootstrap";
import { Header } from "@components/Layout/Header/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "@components/Layout/Footer/Footer";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container className="pt-5">
        <Routes>
          <Route path="/list" element={<ListCars />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export { App };
