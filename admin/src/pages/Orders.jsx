import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- PAGE STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // --- SERVER'DAN SAYFALI SIPAŞLERİ GETİR ---
  const fetchOrders = async (page = 1) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/orders/all?page=${page}&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      toast.error("Siparişler alınamadı!");
    }

    setLoading(false);
  };

  // --- SİPARİŞ DURUMU GÜNCELLE ---
  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/orders/update-status/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Sipariş durumu güncellendi");
        fetchOrders(currentPage);
      }
    } catch (err) {
      toast.error("Durum güncellenemedi!");
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  if (loading) return <p className="text-center py-10">Yükleniyor...</p>;

  return (
    <div>
      <div className="flex flex-row gap-2">
      <img src={assets.parcel_icon} alt="parcel_icon" className="w-8 h-8"/>
      <h1 className="text-2xl font-bold mb-6">Tüm Siparişler</h1>
      </div>

      {/* ---- TOP BAR PAGINATION ---- */}
      <div className="justify-between items-center mb-4 hidden sm:flex">
        <p className="text-gray-700">
          Toplam Sayfa: <b>{totalPages}</b>
        </p>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => fetchOrders(currentPage - 1)}
          >
            ← 
          </button>

          <span className="whitespace-nowrap">
            Sayfa <b>{currentPage}</b> / {totalPages}
          </span>

          <button
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={() => fetchOrders(currentPage + 1)}
          >
             →
          </button>
        </div>
      </div>

      {/* ---- ORDER LIST ---- */}
      {orders.length === 0 ? (
        <p>Henüz sipariş yok.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="border p-5 rounded-lg bg-white shadow">
              
              {/* ÜST BİLGİLER */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <p><b>Sipariş ID:</b> {order._id}</p>
                  <p><b>Kullanıcı:</b> {order.userId?.name} ({order.userId?.email})</p>
                  <p><b>Tutar:</b> {currency}{order.amount}</p>
                  <p><b>Ödeme:</b> {order.paymentMethod}</p>
                  <p><b>Tarih:</b> {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                {/* DURUM GÜNCELLE */}
                <div>
                  <label className="font-medium mr-2">Durum:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border p-2 rounded cursor-pointer"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* ÜRÜNLER */}
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-3">Ürünler</h3>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 border p-3 rounded">
                      <img
                        src={item.productId.images[0].url}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.productId.name}</p>
                        <p className="text-sm text-gray-600">
                          Adet: {item.quantity} | Beden: {item.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Fiyat: {currency}{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADRES */}
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Adres Bilgisi</h3>
                <p>{order.address.fullName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city} / {order.address.country}</p>
                <p>{order.address.email}</p>
                <p>{order.address.phone}</p>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ---- BOTTOM PAGINATION ---- */}
      <div className="flex justify-center mt-8 gap-3">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => fetchOrders(i + 1)}
            className={`px-3 py-1 border rounded cursor-pointer ${
              currentPage === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orders;
