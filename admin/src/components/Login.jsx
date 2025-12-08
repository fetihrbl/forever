import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
  
      console.log("Login Response:", response.data);
  
      // Giriş başarılı mı?
      if (response.data.token) {
        toast.success("Giriş başarılı!");
  
        // Token kaydet
        setToken(response.data.token);

        setLoading(true);
  
        // Yumuşak geçiş efekti
        setTimeout(() => {
          setLoading(false);
        }, 700);
  
      } else {
        toast.error("Hatalı email veya şifre");
      }
  
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Sunucu hatası");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className={`bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Panel
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-3 rounded-lg transition font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {loading ? "Giriş yapılıyor..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
