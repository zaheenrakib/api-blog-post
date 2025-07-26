require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("../config/db");
const app = express();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log("✅ Models synchronized!");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Root Route
app.get("/", (req, res) => {
  res.send("App works properly!");
});


const routes = {
  blogpost: require("../routes/blogPostRoute.js"),
  user: require("../routes/userRoute.js")
}

// API Routes
app.use("/api/blog", routes.blogpost)
app.use("/api/user" , routes.user)







// Global Error Handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));