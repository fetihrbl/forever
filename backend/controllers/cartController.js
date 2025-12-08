import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "ProductId and size required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, size, quantity: 1 }],
      });
      return res.json(cart);
    }

    // Ürün zaten sepette mi?
    const item = cart.items.find(
      (i) => i.productId == productId && i.size === size
    );

    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, size, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, delta } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });

    const item = cart.items.find(
      (i) => i.productId == productId && i.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += delta;
    if (item.quantity <= 0) {
      // tamamen sil
      cart.items = cart.items.filter(
        (i) => !(i.productId == productId && i.size === size)
      );
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
      (i) => !(i.productId == productId && i.size === size)
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart || { items: [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
