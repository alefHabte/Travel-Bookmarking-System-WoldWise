import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRouts from "./pages/ProtectedRouts";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// const CityList = lazy(() => import("./components/CityList"));
// const CountryList = lazy(() => import("./components/CountryList"));
// const Form = lazy(() => import("./components/Form"));
// const City = lazy(() => import("./components/City"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
