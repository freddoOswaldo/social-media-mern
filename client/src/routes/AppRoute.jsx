import { Home, Login, Profile } from "pages";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRoute = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isAuth ? <Login /> : <Navigate to="/home" />}
        />
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
        <Route
          path="/profile/:userId"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
