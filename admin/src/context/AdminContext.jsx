import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("admin-token") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <AdminContext.Provider value={{ token, setToken, backendUrl }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
