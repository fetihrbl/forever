import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";

const PlaceOrder = () => {
  const { currency, cartItems, products, delivery_fee, placeOrder } =
    useContext(ShopContext);

  const [method, setMethod] = useState("credit");

  // Cart Data hazırlama
  const cartData = [];
  for (const productId in cartItems) {
    const sizes = cartItems[productId];
    const productInfo = products.find((p) => p._id === productId);
    if (!productInfo) continue;

    for (const size in sizes) {
      if (sizes[size] > 0) {
        cartData.push({
          ...productInfo,
          size,
          quantity: sizes[size],
        });
      }
    }
  }

  const subtotal = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + delivery_fee;

  return (
    <div className="px-4 sm:px-10 py-10 min-h-screen border-t">
      <div className="text-xl sm:text-2xl mb-10 text-gray-800">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE — SHIPPING + PAYMENT */}
        <div className="lg:col-span-2 space-y-10">
          {/* Shipping Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Email"
                className="border p-3 rounded-lg w-full sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border p-3 rounded-lg w-full sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-lg w-full sm:col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Country"
                className="border p-3 rounded-lg w-full"
              />
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="w-4 h-4"
                  checked={method === "credit"}
                  onChange={() => setMethod("credit")}
                />
                <span>Credit Card</span>
              </label>

              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="w-4 h-4"
                  checked={method === "paypal"}
                  onChange={() => setMethod("paypal")}
                />
                <span>PayPal</span>
              </label>

              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="w-4 h-4"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {cartData.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} — Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">
                  {currency}
                  {item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency}
                {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {currency}
                {delivery_fee}
              </span>
            </div>

            <div className="flex justify-between text-lg font-semibold border-t pt-3">
              <span>Total</span>
              <span>
                {currency}
                {total}
              </span>
            </div>
          </div>

          <button onClick={() => placeOrder(method)} className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition cursor-pointer">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
