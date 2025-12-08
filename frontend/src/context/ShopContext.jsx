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
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);


  const navigate = useNavigate();
  
   // -------------------------
  // LOCALSTORAGE'DAN TOKEN YÜKLEME
  // -------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // -------------------------
  // ADD TO CART
  // -------------------------
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please choose a size");
      return;
    } else {
      toast.success("The product has been added");
    }

    setCartItems((prev) => {
      const cart = structuredClone(prev);

      if (!cart[itemId]) cart[itemId] = {};
      if (!cart[itemId][size]) cart[itemId][size] = 1;
      else cart[itemId][size] += 1;

      return cart;
    });
  };

  // -------------------------
  // REMOVE ITEM / UPDATE QUANTITY
  // -------------------------
  const removeItem = (itemId, size) => {
    setCartItems((prev) => {
      const cart = structuredClone(prev);
      if (cart[itemId] && cart[itemId][size]) {
        delete cart[itemId][size];
        if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
      }
      return cart;
    });
  };

  const updateQuantity = (itemId, size, delta) => {
    setCartItems((prev) => {
      const cart = structuredClone(prev);
      if (!cart[itemId] || !cart[itemId][size]) return cart;

      cart[itemId][size] += delta;
      if (cart[itemId][size] <= 0) delete cart[itemId][size];
      if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];

      return cart;
    });
  };

  // -------------------------
  // TOTAL COUNT
  // -------------------------
  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  // -------------------------
// TOTAL PRICE
// -------------------------
const getCartTotal = () => {
  let total = 0;

  for (const itemId in cartItems) {
    const product = products.find((p) => p._id === itemId);
    if (!product) continue;

    for (const size in cartItems[itemId]) {
      total += product.price * cartItems[itemId][size];
    }
  }

  return total;
};

  // -------------------------
  // PLACE ORDER
  // -------------------------
  const placeOrder = (paymentMethod) => {
    const orderItems = [];

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        orderItems.push({
          name: product.name,
          image: product.images?.[0]?.url,
          price: product.price,
          quantity: cartItems[itemId][size],
          size: size,
        });
      }
    }

    const newOrder = {
      orderId: Math.floor(Math.random() * 999999),
      status: "Preparing",
      date: new Date(),
      items: orderItems,
      total: getCartTotal() + delivery_fee,
      payment: paymentMethod,
    };

    setOrders((prev) => [...prev, newOrder]);

    // Sepeti temizle
    setCartItems({});

    toast.success("Order placed successfully!");
    navigate("/orders");
  };

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
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider; 