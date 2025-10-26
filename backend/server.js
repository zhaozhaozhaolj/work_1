import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();
app.use(cors());
app.use("/api", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
