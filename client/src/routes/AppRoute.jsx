import { Home, Login, Profile } from "pages";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRoute = () => {
  const { token: isAuth } = useSelector(({ auth }) => auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isAuth ? <Login /> : <Navigate to="/home" />}
        />
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
        <Route
          path="/profile/:id"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
