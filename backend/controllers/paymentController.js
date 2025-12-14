import iyzipay from "../config/iyzico.js";
import Order from "../models/orderModel.js";

export const createIyzicoPayment = async (req, res) => {
  try {
    const user = req.user;

    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const request = {
      locale: "tr",
      conversationId: order._id.toString(),
      price: order.amount.toString(),
      paidPrice: order.amount.toString(),
      currency: "TRY",
      installment: 1,
      basketId: order._id.toString(),
      paymentChannel: "WEB",
      paymentGroup: "PRODUCT",

      callbackUrl: `${process.env.BACKEND_URL}/api/payments/iyzico/callback`,


      buyer: {
        id: user.id,
        name: order.address.fullName,
        surname: "User",
        gsmNumber: order.address.phone,
        email: order.address.email,
        identityNumber: "11111111111",
        registrationAddress: order.address.street,
        city: order.address.city,
        country: order.address.country,
        ip: req.ip,
      },

      shippingAddress: {
        contactName: order.address.fullName,
        city: order.address.city,
        country: order.address.country,
        address: order.address.street,
      },

      billingAddress: {
        contactName: order.address.fullName,
        city: order.address.city,
        country: order.address.country,
        address: order.address.street,
      },

      basketItems: order.items.map((item) => ({
        id: item.productId._id.toString(),
        name: item.productId.name,
        category1: item.productId.category,
        itemType: "PHYSICAL",
        price: (item.price * item.quantity).toString(),
      })),
    };

    iyzipay.checkoutFormInitialize.create(request, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Payment failed" });
      }

      res.json({
        success: true,
        paymentPageUrl: result.paymentPageUrl,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment error" });
  }
};

export const iyzicoCallback = async (req, res) => {
  
  
  try {
    const token = req.body.token || req.query.token; // works for both
    if (!token) return res.status(400).send("Token missing");
  
    iyzipay.checkoutForm.retrieve({ token }, async (err, result) => {
      if (err || !result) return res.status(500).send(err || "No result");

      if (result.paymentStatus === "SUCCESS") {
        await Order.findByIdAndUpdate(result.conversationId, {
          paymentStatus: "paid",
          paidAt: new Date(),
          paymentResult: result,
        });
        return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
      } else {
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
      }
    });
  } catch (error) {
    res.status(500).send("Callback error");
  }
};

  
  
