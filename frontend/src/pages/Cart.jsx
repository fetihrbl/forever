import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {
  const {
    currency,
    cartItems,
    removeItem,
    updateQuantity,
    navigate,
    getCartTotal,
    delivery_fee,
    token,
    getUserCart,
    loading
  } = useContext(ShopContext);

  // Cart'a girildiğinde yalnızca token varsa fetch et
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  // Loading ekleyelim ki cart boş render olup patlamasın
  if (loading) {
    return (
      <div className="px-4 sm:px-10 py-10 min-h-screen border-t">
        <p className="text-gray-500">Loading your cart...</p>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const total = subtotal + delivery_fee;

  return (
    <div className="px-4 sm:px-10 py-10 min-h-screen border-t">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">

          {cartItems.length === 0 && (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          {cartItems.map((item, index) => {
            if (!item.productId) return null;

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition text-gray-700"
              >
                <div className="w-20 h-20 sm:w-30 sm:h-30 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={item.productId.images?.[0]?.url}
                    alt={item.productId.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-500 mt-1">Size: {item.size}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-gray-500 text-sm">Qty:</span>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId._id, item.size, -1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId._id, item.size, 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <p className="text-lg font-bold text-gray-800">
                    {currency}
                    {item.productId.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item.productId._id, item.size)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Delete"
                      className="w-4 sm:w-5 opacity-80 hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full lg:w-80 bg-white p-6 rounded-xl lg:h-fit shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span>{currency}{delivery_fee}</span>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{currency}{total}</span>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
