import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { orders, getMyOrders, currency, token } = useContext(ShopContext);

  useEffect(() => {
    if (token) {
      getMyOrders();
    }
  }, [token]);
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-600">You have no orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-xl p-6 shadow-sm bg-white">
            
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* DATE + TOTAL */}
            <div className="flex justify-between text-gray-700 mb-4">
              <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="font-semibold">
                Total: {currency}{order.amount}
              </p>
            </div>

            {/* ITEMS */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Items</h3>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b pb-3 mb-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productId.images[0].url}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={item.productId.name}
                    />

                    <div>
                      <p className="font-medium">{item.productId.name}</p>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    {currency}{item.quantity * item.productId.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
