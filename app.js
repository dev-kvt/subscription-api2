import errorMiddleware from "./middleware/error.middleware.js";
import express from "express";
import connectDB from "./db/mongodb.js";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use(errorMiddleware);
app.use(cookieParser);
app.use(arcjetMiddleware);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.get("/", (req, res) => {
  res.send(
    "hi: नमस्ते 👋 🇮🇳, SUB-APIमें आपका स्वागत है | यह उपयोगकर्ता प्रमाणीकरण, उपयोगकर्ता प्रबंधन और सदस्यता सेवाओं को संभालने के लिए Express.js और MongoDB के साथ निर्मित एक RESTful API है। यह API प्रमाणीकरण एंडपॉइंट्स के साथ-साथ उपयोगकर्ताओं और सदस्यताओं के लिए CRUD संचालन का समर्थन करता है।, ru: Привет 👋 🇷🇺, добро пожаловать в SUB-API. Это RESTful API, созданный с использованием Express.js и MongoDB для аутентификации пользователей, управления ими и обслуживания подписок. Этот API поддерживает конечные точки аутентификации, а также CRUD-операции для пользователей и подписок., cn: 您好👋🇨🇳，歡迎使用 SUB-API。這是一個基於 Express.js 和 MongoDB 建立的 RESTful API，用於處理使用者驗證、使用者管理和訂閱服務。此 API 支援驗證端點以及使用者和訂閱的 CRUD 操作。, en: Hello 👋🇺🇸, welcome to SUB-API. This is a RESTful API built with Express.js and MongoDB to handle user authentication, user management, and subscription services. This API supports authentication endpoints as well as CRUD operations for users and subscriptions.",
  );
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Subscription api is running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to connect to the database or start the server:",
      error,
    );
    process.exit(1);
  }
};

startServer();
