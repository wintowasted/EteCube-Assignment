import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<Layout />}>
          <Route element={<RequireAuth />}>
            {/* Private Routes */}
            <Route path="/" element={<Home />} />
            <Route path="companies" element={<Companies />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
