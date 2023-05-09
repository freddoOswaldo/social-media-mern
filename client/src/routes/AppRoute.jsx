import Layout from "components/Layout";
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
        <Route path="" element={isAuth ? <Layout /> : <Navigate to="/" />}>
          <Route path="home" element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
