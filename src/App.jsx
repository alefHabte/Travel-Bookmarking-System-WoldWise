import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRouts from "./pages/ProtectedRouts";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="products" element={<Product />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/AppLayout"
              element={
                <ProtectedRouts>
                  <AppLayout />
                </ProtectedRouts>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />}>
                cities
              </Route>
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />}>
                countries
              </Route>
              <Route path="form" element={<Form />}>
                form
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
