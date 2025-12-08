import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

function App() {
  // Token yükleme
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // LocalStorage yönetimi
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // Logout fonksiyonu
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isLoggedIn = Boolean(token);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer autoClose={2000} position="top-right" />

      {!isLoggedIn ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar logout={handleLogout} />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="*" element={<h1>404 - Sayfa Bulunamadı</h1>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
