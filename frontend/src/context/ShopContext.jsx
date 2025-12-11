import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); // ✔️ eklendi
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // CART GET
  const getUserCart = async () => {
    setLoading(true);
    try {
      if (!token) return;

      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(res.data.cart?.items || []);
    } catch (error) {
      console.log("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  // TOKEN LOAD
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ADD TO CART
  const addToCart = async (productId, size) => {
    if (!token) {
      toast.error("Please login");
      navigate("/login");
      return;
    }

    if (!size) {
      toast.error("Please choose a size");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { productId, size },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCartItems(res.data.cart.items);
      toast.success("The product has been added");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add product to cart");
    }
  };

  // REMOVE ITEM
  const removeItem = async (productId, size) => {
    try {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { productId, size, delta: -9999 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ❗ tekrar fetch
      getUserCart();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE QUANTITY
  const updateQuantity = async (productId, size, delta) => {
    try {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { productId, size, delta },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ❗ fix: güncel cart'ı tekrar çek
      getUserCart();
    } catch (error) {
      console.log(error);
      toast.error("Could not update cart");
    }
  };

  // CART COUNT 
  const getCartCount = () => {
    return Array.isArray(cartItems)
      ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
      : 0;
  };

  // TOTAL PRICE 
  const getCartTotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      if (!item.productId || !item.productId.price) return;

      total += item.productId.price * item.quantity;
    });

    return total;
  };

  // PLACE ORDER (Backend bağlı)
  const placeOrder = async (orderData) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/orders/create`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Order created successfully!");
      return res.data.order;
    } catch (error) {
      console.log(error);
      toast.error("Could not create order");
    }
  };
  //User Orders
  const getMyOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  //All orders for admin
  const getAllOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.orders;
    } catch (error) {
      console.log(error);
    }
  };

  // PRODUCTS LOAD
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Ürünler alınırken bir hata oluştu");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    removeItem,
    updateQuantity,
    getCartCount,
    navigate,
    orders,
    placeOrder,
    getCartTotal,
    backendUrl,
    token,
    setToken,
    loading,
    getUserCart,
    getMyOrders,
    getAllOrders,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
