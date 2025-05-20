const express = require("express");
const { connection } = require("./Configs/db");
const { userRouter } = require("./routes/userRoutes");
const { productRouter } = require("./routes/productRoutes");
const { cartRouter } = require("./routes/cartRoutes");
const { wishlistRouter } = require("./routes/wishlistRoutes");
const { orderRouter } = require("./routes/orderRoutes");
const { couponRouter } = require("./routes/couponRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Apply middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], // Allowed methods for CORS
  })
);
app.use(express.json()); // Middleware to parse JSON bodies

// Welcome route to test server availability
app.get("/", (req, res) => {
  res.send("Welcome to Lenskart API"); // Simple welcome message
});


// Mount routers to handle different API endpoints
app.use("/user", userRouter); // Handles user-related API endpoints
app.use("/product", productRouter); // Handles product-related API endpoints
app.use("/cart", cartRouter); // Handles cart-related API endpoints
app.use("/wishlist", wishlistRouter); // Handles wishlist-related API endpoints
app.use("/order", orderRouter); // Handles order-related API endpoints
app.use("/coupon", couponRouter); // Handles coupon-related API endpoints


// Error handling middleware to catch any errors that occur during request processing
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).send({
    error: "Something went wrong on the server",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined // Provide error message in development mode
  });
});

// Handler for requests to undefined routes
app.use((req, res) => {
  res.status(404).send({ error: "Route not found" }); // Send 404 for unknown routes
});

// Start server
const PORT = process.env.PORT || process.env.port || 8080; // Define port to listen on
app.listen(PORT, async () => {
  try {
    await connection; // Connect to the database
    console.log("Connected to the database");
  } catch (err) {
    console.log("Error connecting to the database:", err);
  }
  console.log(`Server running on port ${PORT}`); // Log server running status
});