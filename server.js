import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NCHW8LhreZDMzZOQzMP03KF" }],
      line_items: req.body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/g27gssy0/production/"
          )
          .replace("-webp", ".webp");
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}`,
    };
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.listen(5500, () => console.log("Server is running"));
