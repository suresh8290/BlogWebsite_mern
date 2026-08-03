const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

// ======================
// Database Connection
// ======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

// ======================
// Middlewares
// ======================

app.use(
  cors({
    origin: "https://blog-website-mern-sand.vercel.app", // Your Vercel frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "images")));

// ======================
// Routes
// ======================

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// ======================
// Image Upload
// ======================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

// ======================
// Test Route
// ======================

app.get("/", (req, res) => {
  res.send("🚀 Blog Backend is Running");
});

// ======================
// Server
// ======================

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});