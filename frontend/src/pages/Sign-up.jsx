import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
  
      toast.success(`Account created`)
  
      // İstersen formu temizle
      setName("");
      setEmail("");
      setPassword("");
  
      // Eğer backend token döndürüyorsa
      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/"); 
      } else {
        toast.error(res.data.message) 
      }
  
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center border-t">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
