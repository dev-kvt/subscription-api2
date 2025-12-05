import errorMiddleware from './middleware/error.middleware.js'
import express from "express";
import connectDB from "./db/monogodb.js";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use(errorMiddleware);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.get("/", (req, res) => {
  res.send("नमस्ते 👋 , सब-एपीआई में आपका स्वागत है");
});

app.listen(PORT, () => {
  console.log(`subscription api is running on PORT: ${PORT}`);

} ,await connectDB()
);
