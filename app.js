require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? "production.env"
      : "development.env",
});
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fragranceRoutes = require("./src/routes/fragranceRoutes");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [process.env.MONDAY_WHITELIST];

      if (
        process.env.NODE_ENV === "development" ||
        allowedOrigins.indexOf(origin) !== -1
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/fragrance", fragranceRoutes);

app.use((req, res, next) => {
  const err = new Error(getReasonPhrase(StatusCodes.NOT_FOUND));
  err.statusCode = StatusCodes.NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage =
    err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  res.status(statusCode).json({
    status: "error",
    message: errorMessage,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is in ${process.env.NODE_ENV} mode and running on http://localhost:${PORT}`
  );
});
