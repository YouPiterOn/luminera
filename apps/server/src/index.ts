import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default { app }