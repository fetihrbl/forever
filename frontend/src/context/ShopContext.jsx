import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);   // ✔️ eklendi
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();

  // CART GET
  const getUserCart = async () => {
    setLoading(true);
    try {
      if (!token) return;

      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(res.data.cart?.items || []);
    } catch (error) {
      console.log("Cart fetch error:", error);
    }finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getUserCart();
  }, [token, backendUrl]);


  // TOKEN LOAD
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ADD TO CART
  const addToCart = async (productId, size) => {
    if (!token) {
      toast.error("Please login");
      navigate("/login")
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
          headers: { Authorization: `Bearer ${token}` }
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
          headers: { Authorization: `Bearer ${token}` }
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
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      // ❗ fix: güncel cart'ı tekrar çek
      getUserCart();
    } catch (error) {
      console.log(error);
      toast.error("Could not update cart");
    }
  };

  // CART COUNT ✔️ düzeltildi
  const getCartCount = () => {
    return Array.isArray(cartItems)
  ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
  : 0;
  };

  // TOTAL PRICE ✔️ doğru
  const getCartTotal = () => {
    let total = 0;
  
    cartItems.forEach(item => {
      if (!item.productId || !item.productId.price) return;
  
      total += item.productId.price * item.quantity;
    });
  
    return total;
  };
  

  // PLACE ORDER (Frontend-only)
  // NOT: istersen backend'e bağlayayım
  const placeOrder = () => {
    toast.success("Order placed!");
  
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
    getUserCart
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
