import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware'den gelir
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "productId and size required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, size, quantity: 1 }]
      });
    } else {
      const existing = cart.items.find(
        (item) => item.productId.toString() === productId && item.size === size
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({ productId, size, quantity: 1 });
      }

      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Error in addToCart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, delta } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ cart: [] });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId && i.size === size
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    item.quantity += delta;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => !(i.productId.toString() === productId && i.size === size)
      );
    }

    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json({ success: true, cart: cart || [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

