import React from "react";
import CountryList from "./pages/country-list/CountryList";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/register/RegisterForm";
import AddFavoriteCountryForm from "./pages/add-favorite-form/AddFavoriteCountryForm";
import FavoriteCountryList from "./pages/favorites/FavoriteCountryList";
import { FavoriteCountriesProvider } from "./context/FavoriteCountriesContext";
import UpdateFavoriteCountryForm from "./pages/update-favorite-form/UpdateFavoriteCountryForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="container mx-auto p-4">
      <AuthenticationProvider>
        <FavoriteCountriesProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<CountryList />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/favorites"
                element={<PrivateRoute element={FavoriteCountryList} />}
              />
              <Route
                path="/add-favorite-form"
                element={<PrivateRoute element={AddFavoriteCountryForm} />}
              />
              <Route
                path="/update-favorite-form"
                element={<PrivateRoute element={UpdateFavoriteCountryForm} />}
              />
            </Routes>
          </BrowserRouter>
        </FavoriteCountriesProvider>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
