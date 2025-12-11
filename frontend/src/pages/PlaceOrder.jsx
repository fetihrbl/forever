import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { cartItems, getCartTotal, navigate, backendUrl, token } =
    useContext(ShopContext);

  const [method, setMethod] = useState("credit");
  const [loading, setLoading] = useState(false);

  // FORM STATE
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  // BACKEND'E ORDER GÖNDERME
  const handleOrder = async () => {
    // --- VALIDATION CHECKS ---
  
    // 1) Kullanıcı login mi?
    if (!token) {
      toast.error("Lütfen giriş yapın");
      return;
    }
  
    // 2) İsim
    if (!form.firstName || !form.lastName) {
      toast.error("Lütfen ad ve soyad girin");
      return;
    }
  
    // 3) Email
    if (!form.email) {
      toast.error("E-posta adresi boş bırakılamaz");
      return;
    }
  
    // 4) Telefon
    if (!form.phone) {
      toast.error("Telefon numarası gereklidir");
      return;
    }
  
    // 5) Adres satırı
    if (!form.address) {
      toast.error("Adres bilgisi eksik");
      return;
    }
  
    // 6) Şehir
    if (!form.city) {
      toast.error("Şehir alanı boş bırakılamaz");
      return;
    }
  
    // 7) Ülke
    if (!form.country) {
      toast.error("Ülke seçilmelidir");
      return;
    }
  
    // 8) Ödeme yöntemi
    if (!method) {
      toast.error("Lütfen bir ödeme yöntemi seçin");
      return;
    }
  
    // 9) Sepet boş mu?
    if (!cartItems || cartItems.length === 0) {
      toast.error("Sepetiniz boş");
      return;
    }
  
    // -----------------------------------
    // VALIDATION GEÇTİ → ORDER GÖNDER
    // -----------------------------------
  
    setLoading(true);
  
    try {
      const cartData = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        size: item.size,
        name: item.productId.name,
        price: item.productId.price,
      }));
  
      const orderData = {
        items: cartData,
        amount: getCartTotal(),
        address: {
          fullName: form.firstName + " " + form.lastName,
          email: form.email,
          phone: form.phone,
          street: form.address,
          city: form.city,
          postalCode: form.postalCode || "00000",
          country: form.country,
        },
        paymentMethod: method,
      };
  
      const res = await axios.post(
        `${backendUrl}/api/orders/create`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (res.data.success) {
        toast.success("Sipariş oluşturuldu!");
        navigate("/orders");
      } else {
        toast.error(res.data.message || "Sipariş oluşturulamadı");
      }
    } catch (err) {
      toast.error("Sipariş gönderilemedi");
      console.log(err);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="w-full flex flex-col md:flex-row gap-10">
      {/* LEFT - ADDRESS FORM */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <input
          type="text"
          placeholder="First Name"
          className="border p-3 rounded-lg w-full"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Last Name"
          className="border p-3 rounded-lg w-full"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Phone"
          className="border p-3 rounded-lg w-full"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          className="border p-3 rounded-lg w-full"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="text"
          placeholder="City"
          className="border p-3 rounded-lg w-full"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <input
          type="text"
          placeholder="Country"
          className="border p-3 rounded-lg w-full"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="border p-3 rounded-lg w-full"
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
        />
      </div>

      {/* RIGHT - PAYMENT + SUMMARY */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-xl font-semibold">Payment Method</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={method === "credit"}
              onChange={() => setMethod("credit")}
            />
            <span>Kredi Kartı</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={method === "paypal"}
              onChange={() => setMethod("paypal")}
            />
            <span>PayPal</span>
          </label>
        </div>

        {/* ORDER SUMMARY */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p className="text-gray-700">Total: ${getCartTotal()}</p>
        </div>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg w-full hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
