import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// -------------------------------------------
// Create Order
// -------------------------------------------
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      status: "processing",
      paymentStatus: "pending",
    });

    // Clear the user's cart after order creation
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// -------------------------------------------
// Get Orders of Logged In User
// -------------------------------------------
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId");

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// -------------------------------------------
// Admin: Get All Orders
// -------------------------------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("items.productId");

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// -------------------------------------------
// Admin: Update Order Status
// -------------------------------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "orderId and status required" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};
